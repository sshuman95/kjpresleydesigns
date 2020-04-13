import React, { useState, useEffect } from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import '../storeItem/storeItem.css';
import GradeIcon from '@material-ui/icons/Grade';
import axios from 'axios';

const Reviews = ({itemId})=>{
  const [reviews,setReviews] = useState(0);
  const [numReviews,setNumReviews] = useState(0)
  
  useEffect(()=>{
    async function getReviews(){
      axios.get(`/reviews/${itemId}`
        )
        .then(res=>{
          let reviewAvg = 0;
          res.data.forEach(review=>{
           reviewAvg+=review.review;
          })
          if(reviewAvg === 0){
            setReviews(reviewAvg)
            setNumReviews(res.data.length)
          } else {
         let realAvg = Math.floor(reviewAvg/=res.data.length);
          setReviews(realAvg)
          setNumReviews(res.data.length)
          }
        })
        .catch(err=>{
          console.log(err)
        })
    }
    getReviews();
    },[itemId]);

  function createElements(n){
      let elements = [];
      let emptyStars = 5;
      for(let i =0; i < n; i++){
          emptyStars--
          elements.push(<GradeIcon key={i} style={{color:'rgb(96, 73, 139)',fontSize:'medium'}}/>);
      }
      for(let i =0; i < emptyStars; i++){
        elements.push(<StarBorderIcon key={'noStar'+i} style={{color:'black',fontSize:'medium'}}/>);
    }
      return elements;
  }


    return (     
        <div className='reviewWrapper'>
        {createElements(reviews)}
        <span>{numReviews} reviews</span>
        </div>
    )
  };
  
export default Reviews;




