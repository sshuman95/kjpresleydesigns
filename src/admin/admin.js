import React from 'react';
import fire from '../config/fire.js';
import LoginForm from './login/login';
import Dashboard from './dashboard/dashboard';


class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:null,
            email:'',
            password:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.login=this.login.bind(this);
        this.logout=this.logout.bind(this);
    };


    componentDidMount(){
        this.authListener();
    }

    authListener(){
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({
                    user:user
                })
            } else{
                this.setState({
                    user:null
                })
            }
        })
    }

    login(event){
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((u)=>{})
        .catch(error=>{
            console.log(error)
        })
    }

    logout(){
        fire.auth().signOut();
    }

    handleChange(event){
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render(){
        return(
            <div style={{marginTop:'100px'}}>
                {this.state.user?
                <Dashboard
                logout={this.logout}/>:
                <LoginForm
                handleChange={this.handleChange} 
                email={this.state.email}
                password={this.state.password}
                login={this.login}/>}
            </div>
        )
    }
};

export default Admin;