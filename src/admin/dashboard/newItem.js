import React from 'react';
import axios from 'axios';
import './dashboard.css';
import fire from '../../config/fire'

class NewItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            price:0,
            size:"",
            care:"",
            NewColors:{
                Color:'',
                source:''
            },
            tags:[],
            tagToAdd:'',
            error:'',
            fiber:''
        };
        this.handleChange=this.handleChange.bind(this);
        this.createItem=this.createItem.bind(this);
        this.handleAddColor=this.handleAddColor.bind(this);
        this.handleSelectFile =this.handleSelectFile.bind(this);
        this.handleAddTag=this.handleAddTag.bind(this);
        this.handleClearTags=this.handleClearTags.bind(this);
    };

    handleChange(event){
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        });
       
    };

    handleAddColor(event){
        event.preventDefault();
        this.setState({ NewColors: { ...this.state.NewColors, Color: event.target.value} });
    }



    handleAddTag(event){
        event.preventDefault();
        let tags = this.state.tags;
        let tagToAdd = this.state.tagToAdd;
        if(tagToAdd.length === 0){
            this.setState({
                error:'Tag field can not be empty'
            })
        } else {
        tags.push(tagToAdd);
        this.setState({
            tags:tags,
            tagToAdd:'',
            error:''
        })
    }
    }

     
    handleClearTags(event){
        event.preventDefault();
        this.setState({
           tags:[]
       })
    };



    handleSelectFile(event){
     let file = event.target.files[0];
      const newFile = fire.storage().ref(`/${file.name}`).put(file)
        newFile.on('state_changed',
        (snapshot)=>{

        },
        (error)=>{
            console.log(error)
        },
        ()=>{
            fire.storage().ref(`/${file.name}`).getDownloadURL().then(url=>{
                this.setState({ NewColors: { ...this.state.NewColors, source: url} });
            })
        })
    }

    createItem(event){
        event.preventDefault();
        let item = this.state;
        if(item.name&&item.price&&item.size){
        axios.post(`/admin/createItem`,{
            name:item.name,
            price:parseInt(item.price, 10),
            size:item.size,
            care:item.care,
            NewColors:{
                color:item.NewColors.Color,
                source:item.NewColors.source
            },
            tags:item.tags,
            quantity:1,
            fiber:item.fiber
        })
        .then(res=>{
            this.props.getNewItems()
            this.setState({
                name:"",
                price:0,
                size:"",
                care:"",
                colorToAdd:'',
                NewColors:{
                    color:'',
                    source:''
                },
                tags:[],
                tagToAdd:'',
                error:'',
                fiber:''
            })
          })
          .catch(err=>{
            console.log(err)
          })
        } else {
            this.setState({error:"All fields must be filled out"})
        }
    }

    render(){
        return(
            <div className='newItemContainer'>
                <h1 style={{textAlign:'center'}}>Add new items here</h1>
                <form id='createForm' onSubmit={this.createItem}>
                    <label htmlFor='name'>Name: </label>
                    <input onChange={this.handleChange} name='name' value={this.state.name}/>
                    
                    
                    <label htmlFor='tags'>Tags:{this.state.tags.length>0?this.state.tags.map(tag=>{
                                return tag+", ";
                            }):null} </label>
                            <input onChange={this.handleChange} name='tagToAdd' value={this.state.tagToAdd}/>
                            <button style={{marginTop:'10px'}} onClick={this.handleAddTag}>Add tag</button>
                            <button style={{marginTop:'10px',marginBottom:'10px'}} onClick={this.handleClearTags}>Clear All Tags</button>
                    
                    
                    <label htmlFor='price'>Price: </label>
                    <input onChange={this.handleChange} name='price' value={this.state.price}/>
                    <label htmlFor='size'>Size: </label>
                    <input onChange={this.handleChange} name='size' value={this.state.size}/>
                    <label htmlFor='care'>Care: </label>
                    <input onChange={this.handleChange} name='care' value={this.state.care}/>
                    <label htmlFor='care'>Fiber: </label>
                    <input onChange={this.handleChange} name='fiber' value={this.state.fiber}/>
                    <label htmlFor='care'>Color: </label>
                    <input onChange={this.handleAddColor} name='color' value={this.state.NewColors.Color}/>
                    <input onChange={this.handleSelectFile} type='file'/>
                    {this.state.NewColors.source?<img alt='New store item' style={{width:'200px', height:'200px',margin:'10px auto 0 auto'}} src={this.state.NewColors.source}/>:''}
                    <button style={{marginTop:'10px'}} type='submit'>Create Item</button>  
                </form>
                {this.state.error?<p style={{textAlign:'center',color:'red'}}>{this.state.error}</p>:null}
             
            </div>
        )
    }
};

export default NewItem;