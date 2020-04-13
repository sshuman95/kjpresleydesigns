import React from 'react';
import axios from 'axios';
import EditForm from '../editForm/editForm';
import './dashboard.css';
import NewItem from './newItem';
 //import CustomOrders from '../customOrders/customOrders';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            itemList:[],
            
        };
        this.getNewItems = this.getNewItems.bind(this);
    };

    componentDidMount(){
      this.getNewItems()
    };

    getNewItems(){
      axios.get(`/items/all`
      )
      .then(res=>{
        let items = [];
        res.data.forEach(item=>{
          items.push(item)
        })
        this.setState({
          itemList:items
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }

    deleteItem(id){
        axios.delete(`/admin/remove/${id}`);
    }

    render(){
        return(
            <div className='dashContainer'> 
                <h1 style={{textAlign:'center'}}>Welcome to the dashboard</h1>
                <div className='mainContainer'>
                  <div className='itemContainer'>
                    <p>Items currently in store</p>
                    {this.state.itemList.map(item=>{
                      return(
                          <EditForm  getNewItems={this.getNewItems} key={item.itemId} item={item} deleteItem={this.deleteItem}/>
                      )
                    })}
                  </div>
                  <div className='newContainer'>
                      <NewItem getNewItems={this.getNewItems}/>
                  </div>
                </div>
                <button style={{marginTop:'50px'}} onClick={this.props.logout}>Log out</button>
            </div>
        )
    }
};

export default Dashboard;
