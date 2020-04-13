import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditColors from './editColors';
import axios from 'axios';
import './editForm.css';

class EditForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:this.props.item.name,
            price:this.props.item.price,
            size:this.props.item.size,
            care:this.props.item.care,
            NewColors:this.props.item.newColors,
            error:'',
            edit:false,
            success:'',
            fiber:this.props.item.fiber,
            tags:this.props.item.tags,
            tagToAdd:'',
            editColor:false
        };
        this.handleClick= this.handleClick.bind(this);
        this.handleAddObject= this.handleAddObject.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editItem = this.editItem.bind(this);
        this.handleAddTag=this.handleAddTag.bind(this);
        this.handleClearTags=this.handleClearTags.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
    };


    handleClick(action){

        if(action==='edit'){
        let edit = !this.state.edit;
        this.setState({
            edit:edit,
            editColor:false
        })
     } else if(action==='color'){
        let editColor = !this.state.editColor;
        this.setState({
            edit:false,
            editColor:editColor
        })
     }
    };

    handleChange(event){
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    handleAddObject(obj){
        let color = this.state.NewColors;
        color.push(obj);
        this.setState({
            NewColors:color
        });
        axios.put(`/admin/edit/color/${this.props.item.itemId}`,{
            NewColors:this.state.NewColors
        })
        .then(res=>{
            this.setState({
                success:res.data.message
            })
        })
        .then(()=>{
            this.props.getNewItems()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleAddTag(event){
        event.preventDefault();
        let tags = this.state.tags;
        let tagToAdd = this.state.tagToAdd;
        if(tagToAdd.length === 0){
            this.setState({
                error:'tag field can not be empty'
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


    deleteColor(e,i){
        e.preventDefault();
        let colors = this.state.NewColors;
        colors.splice(i,1)
        if(colors.length >0){
            this.setState({
                NewColors:colors
            });
            axios.put(`/admin/edit/color/${this.props.item.itemId}`,{
                NewColors:this.state.NewColors
            })
            .then(res=>{
                this.setState({
                    success:res.data.message
                })
            })
            .catch(err=>{
                console.log(err)
            }) 
        } else {
          console.log("Each item must have at least 1 color!");
        }
    }
    


    editItem(event){    
        event.preventDefault();
        let item = this.state;
        if(item.name&&item.price&&item.size&&item.tags.length>0){
        axios.put(`/admin/edit/${this.props.item.itemId}`,{
            name:item.name,
            price:item.price,
            size:item.size,
            care:item.care,
            quantity:1,
            fiber:item.fiber,
            tags:item.tags
        })
        .then(res=>{
            this.setState({
                success:res.data.message
            })
        })
        .then(()=>{
            this.props.getNewItems()
        })
        .catch(err=>{
            console.log(err)
        })
     } else {
            this.setState({error:"All fields must be filled out"})
        }
    };



    render(){
        return(
            <ExpansionPanel>       
                  <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id='panel1bh-content'
                >
                 <p>{this.props.item.name}</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className='clydeDog'>
                {!this.state.edit?
                    <div key={this.props.item.itemId} className='itemDashWrapper'>
                            <p>Name: {this.props.item.name}</p>
                            <div className='colorContainer'>
                                    <p>Tags:</p>
                            {this.props.item.tags.map(tag=>{
                                return (
                                    <li key={tag}>{tag}</li>
                                )
                            })}
                            </div>
                            <p>Price: {this.props.item.price}</p>
                            <p>Size: {this.props.item.size}</p>
                            <p>Care: {this.props.item.care}</p>
                            <p>Fiber: {this.props.item.fiber}</p>
                            <span style={{textAlign:'center'}}>Current Colors</span>
                            <button type='button' onClick={() => { this.handleClick("color") }} style={{margin:'0 auto'}}>Edit Colors</button>
                                <div id="colorListContainer">
                                {this.props.item.newColors.map((obj,i)=>{
                                    return(
                                        <ul className='colorList' key={i}>
                                            <li>{obj.Color}</li>
                                            <li><a rel="noopener noreferrer" href={obj.source} target="_blank">Image</a></li>
                                            {this.state.editColor?<button onClick={(e=>{this.deleteColor(e,i)})} className='deleteColor'>delete</button>:''}
                                        </ul>
                                    )
                                })}
                                </div>
                                {this.state.editColor?<EditColors id={this.props.item.itemId} handleAddObject={this.handleAddObject}/>:''}
                            <div className='buttonContainer'>
                                <button type='button' onClick={() => { this.handleClick("edit") }}>Edit Item</button>
                                <button  type='button' onClick={() => { this.props.deleteItem(this.props.item.itemId) }}>Delete</button>
                            </div>
                    </div>:<form className='editForm' onSubmit={this.editItem}>
                      
                        {this.state.error?<p style={{textAlign:'center',color:'red'}}>{this.state.error}</p>:null}
                        {this.state.success?<p style={{margin:'0 auto',width:'150px',textAlign:'center',color:'green'}}>{this.state.success}</p>:null}
                             <label htmlFor='name'>Name: </label>
                            <input onChange={this.handleChange} name='name' value={this.state.name}/>
                            <label htmlFor='tags'>Tags:{this.state.tags.length>0?this.state.tags.map(tag=>{
                                return tag+", ";
                            }):null} </label>
                            <input onChange={this.handleChange} name='tagToAdd' value={this.state.tagToAdd}/>
                            <button  type='button' style={{marginTop:'10px'}} onClick={this.handleAddTag}>Add tag</button>
                            <button  type='button' style={{marginTop:'10px',marginBottom:'10px'}} onClick={this.handleClearTags}>Clear All Tags</button>
                            <label htmlFor='price'>Price: </label>
                            <input onChange={this.handleChange} name='price' value={this.state.price}/>
                            <label htmlFor='size'>Size: </label>
                            <input onChange={this.handleChange} name='size' value={this.state.size}/>
                            <label htmlFor='care'>Care: </label>
                            <input onChange={this.handleChange} name='care' value={this.state.care}/>
                            <label htmlFor='fiber'>Fiber: </label>
                            <input onChange={this.handleChange} name='fiber' value={this.state.fiber}/>
                            <button   style={{marginTop:'10px'}} type='submit'>Submit Edit</button>
                            <button  type='button' style={{marginTop:'10px'}} className='closeEditBtn' onClick={() => { this.handleClick("edit") }}>Cancel Edit</button>
                        </form>}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
        }
};

export default EditForm;