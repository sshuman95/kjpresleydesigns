import React from 'react';
import axios from 'axios';
import './reviewForm.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class ReviewForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            comment:'',
            rating:'5',
            error:false,
            success:false,
            open:false
        }
    };

    handleChange=(event)=>{
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    toggleOpen=(event)=>{
        event.preventDefault();
        let result = !this.state.open
        this.setState({
            open:result
        })
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        let cReview = {
            name:this.state.name,
            comment:this.state.comment,
            review:this.state.rating
        };
        if(cReview.name.length < 1 &&cReview.comment.length < 1){
            this.setState({
                error:'Please enter your name and review.'
            })
        }
        else if(cReview.name.length<1){
            this.setState({
                error:'Please enter your name.'
            })
        } else if(cReview.comment.length <1){
            this.setState({
                error:'Please enter your review.'
            })
        } else {
            axios.post(`/reviews/${this.props.itemId}`,{
                name:cReview.name,
                review:parseInt(cReview.review, 10),
                comment:cReview.comment
            })
            .then(res=>{
                this.setState({
                    success:true
                })
                this.props.handleUpdate(this.props.itemId)
              })
              .catch(err=>{
                console.log(err)
              })
        }
    }

    render(){
        return(
            this.state.success?<span>Oi, thanks!</span>:
            <div>
                <h3 style={{textAlign:'center'}}>Post a review</h3>
                <ExpandMoreIcon onClick={this.toggleOpen} style={{cursor:'pointer'}}/>
                {!this.state.open?null:<form onSubmit={this.handleSubmit}>
                    {this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:null}
                    <ul className='reviewForm'>
                        <li>
                        <label htmlFor="name">Name: </label>
                        <input placeholder='Name' type='text' onChange={this.handleChange} name='name' value={this.state.name} id='name'/>
                        </li>
                        <li>
                        <label htmlFor="rating">Rating: </label>
                        <select name='rating' id='rating' onChange={this.handleChange}>
                        <option value={5}>5</option>
                        <option value={4}>4</option>
                        <option value={3}>3</option>
                        <option value={2}>2</option>
                        <option value={1}>1</option>  
                        </select>
                        </li>
                        <li>
                        <label htmlFor="comment" >Review: </label>
                        <textarea id='review' placeholder='Review' type='text' name='comment'  onChange={this.handleChange} value={this.state.comment}/>
                        </li>
                        <button type='submit' className='gridButton'>Submit</button>
                    </ul>
                </form>}
            </div> 
            
        )
    }
};

export default ReviewForm;


/*
         <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon id='test'/>}
              aria-controls="panel1bh-content"
              id='panel1bh-content'
            >
              <h3 style={{textAlign:'center'}}>Post a review</h3>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <form onSubmit={this.handleSubmit} className='reviewForm'>
                        {this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:null}
                            <label htmlFor="name">Name</label>
                            <input type='text' onChange={this.handleChange} name='name' value={this.state.name} id='name'/>
                            <label htmlFor="rating">Rating</label>
                            <select name='rating' onChange={this.handleChange}>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>  
                            </select>
                            <label htmlFor="comment">Review</label>
                            <input type='text' name='comment' onChange={this.handleChange} value={this.state.comment} id='review'/>
                            <button type='submit'>fdas</button>
                    </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>


 this.state.success?<span>Oi, thanks!</span>:
            <div>
                <h3 style={{textAlign:'center'}}>Post a review</h3>
                <ExpandMoreIcon onClick={this.toggleOpen} style={{cursor:'pointer'}}/>
                {!this.state.open?null:<form onSubmit={this.handleSubmit} className='reviewForm'>
                    {this.state.error?<p style={{color:'red'}}>{this.state.error}</p>:null}
                        <label htmlFor="name" className='gridName'>Name: </label>
                        <input placeholder='Name' type='text' className='gridNameInput' onChange={this.handleChange} name='name' value={this.state.name} id='name'/>
                        <label htmlFor="rating" className='gridRating'>Rating: </label>
                        <select name='rating' className='gridRatingInput' onChange={this.handleChange}>
                        <option value={5}>5</option>
                        <option value={4}>4</option>
                        <option value={3}>3</option>
                        <option value={2}>2</option>
                        <option value={1}>1</option>  
                        </select>
                        <label htmlFor="comment" className='gridReview'>Review: </label>
                        <textarea className='gridReviewInput'placeholder='Review' type='text' name='comment'  onChange={this.handleChange} value={this.state.comment} id='review'/>
                        <button type='submit' className='gridButton'>Submit</button>
                </form>}
            </div> 
          
*/