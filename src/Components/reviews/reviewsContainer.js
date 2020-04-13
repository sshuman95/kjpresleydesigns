import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './reviewForm'
import './reviewsContainer.css';
import GradeIcon from '@material-ui/icons/Grade';


const ReviewsContainer = ({itemId})=>{
  const [reviews,setReviews] = useState([]);
  
  useEffect(()=>{
    async function getReviews(){
      axios.get(`/reviews/${itemId}`
        )
        .then(res=>{
          let reviews = [];
          res.data.forEach(review=>{
            reviews.unshift(review)
          })
          setReviews(reviews)
        })
        .catch(err=>{
          console.log(err)
        })
    }
    getReviews();
    },[itemId]);

    const updateReviews=(id)=>{
      axios.get(`/reviews/${id}`
        )
        .then(res=>{
          let reviews = [];
          res.data.forEach(review=>{
            reviews.unshift(review)
          })
          setReviews(reviews)
        })
        .catch(err=>{
          console.log(err)
        })
    }

  function createElements(n){
      var elements = [];
      for(let i =0; i < n; i++){
          elements.push(<GradeIcon key={i} style={{color:'rgb(96, 73, 139)',fontSize:'medium'}}/>);
      }
      return elements;
  }

  function createDate(d){
    var newDate = new Date(d*1000).toLocaleDateString("en-US")
      return newDate
  }

    return (     
      <div id='reviewRoot'>
      <h3 className='title'>Customer Reviews</h3>
       {reviews.length===0?<div id='none'><h3>No reviews yet!</h3></div>:reviews.map(review=>{
         return (
           <div key={review.id} className='reviewRow'>
             <div className='customerInfo'>
           <p>{review.name}</p>
           <p>{createDate(review.addedAt._seconds)}</p>
           </div>
           <div className='reviewData'>
             <div className='reviewContainer'>
                {createElements(review.review)}
              </div>
              <p>{review.comment}</p>
           </div>
           </div>
         )
       })}
    <ReviewForm itemId={itemId} handleUpdate={updateReviews}/>
      </div>
    )
  };
  
export default ReviewsContainer;
//     <ReviewForm itemId={itemId}/>
