import React, { useState, useEffect } from 'react';
import Reviews from '../reviews/reviews'
import ReviewsContainer from '../reviews/reviewsContainer'
import axios from 'axios'
import './storeItem.css';
import Loading from '../misc/loading';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  typography:{
    fontFamily:'Josefin Sans'
  },
  expand:{
    width:'100%',
    marginTop:'10px',
    overflow:'hidden'
  },
  expandDetails:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    overflow:'hidden'
  },
  form:{
    display:'flex',
    flexDirection:'row',
    color: 'black',
    fontFamily:'Josefin Sans',
  }
}));


function StoreItem(props){
  const classes = useStyles();
  const [item,setItem] = useState([]);
  let [quantity] = useState(1);
  let [color,setColor] = useState('');
  let [itemSource,setSource] = useState('');
  let [error,setError] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

    useEffect(()=>{
      window.scrollTo(0, 0);
      async function getItem(){
        if(!item.tags || props.tag.match.params.tag !==item.tags[0]){
        axios.get(`/items/${props.tag.match.params.tag}/${props.tag.match.params.id}`
        )
        .then(res=>{
          if(res.data.length===0){
            setError(true)
          } else{
          setItem(res.data)
          setColor(res.data.NewColors[0].Color)
          setSource(res.data.NewColors[0].source)
          setError(false)
          }
        })
        .catch(err=>{
          console.log(err)
        })
        }
      }
      getItem();
      },[props.tag,item.tags])



      const handleChange = event=>{
      event.preventDefault();
      setSource(event.target.name);
      setColor(event.target.value)
      
    }

  


    const handleOpen = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    return (
        error?
        <div id='errorDiv'>
          <h1>We could't find what you were looking for.</h1>
          <h3>Check back soon!</h3>
          </div>
          :!itemSource?<Loading/>:
        <div className={classes.root}> 
          <div  className='itemRowOne'>
            <div className='innerFlexOne'>
              {item?<img className='sItemImg' src={itemSource} alt={item.name} />:null}
            </div>
          <div className='innerFlexTwo'>
              <h2>{item.name}</h2>
              <Reviews itemId={props.tag.match.params.id}/>
              <h3>{item.price?`$${item.price}.00`:null}</h3>
              <FormControl component="fieldset">
                <FormLabel component="legend" style={{color:'rgb(96, 73, 139)',fontFamily:'Josefin Sans'}}>Color</FormLabel>
                <RadioGroup aria-label="Color Select" className={classes.form} name={itemSource} value={color} onChange={handleChange}>
                {item.NewColors.map((c,i)=>{
                    return (<FormControlLabel key={i} value={c.Color} name={c.source} control={<Radio className={classes.radio} style={{color:'black'}}/>} label={c.Color} />)
                  })}
                </RadioGroup>
              </FormControl>
              <ExpansionPanel className={classes.expand}  expanded={expanded === 'panel1'} onChange={handleOpen('panel1')}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id='panel1bh-content'
                >
                  <Typography className={classes.typography}>Product Details</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expandDetails}>
                  <Typography className={classes.typography}>
                  <span style={{fontWeight:'bold'}}>Size:</span> {item.size}
                  </Typography>
                  <Typography className={classes.typography}>
                  <span style={{fontWeight:'bold'}}>Fiber:</span> {item.fiber}
                  </Typography>
                  <Typography className={classes.typography}>
                  <span style={{fontWeight:'bold'}}>Care:</span> {item.care}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
                <button className='addButton' onClick={(e)=>props.handleAddToCart(e,props.tag.match.params.id,item,quantity,color,itemSource)}>Add to Cart</button>
              </div>
             
          </div>
          <ReviewsContainer itemId={props.tag.match.params.id}/>
        </div>
    )
  };
  export default StoreItem;


      /*return function cleanup(){
      setItem([]);
      
      setQuantity(1);

              {item.source?
              <div>
                <h3>Quantity: </h3>
                <div id='itemQuantity'>
                    <button type="button" onClick={()=>{
                      if(quantity===1){
                        setQuantity(1)
                      } else {
                      quantity--
                      setQuantity(quantity)
                      }
                    }}>-</button>
                    <h4 className='quantity'>{quantity}</h4>
                    <button type="button" onClick={()=>{
                      quantity++
                      setQuantity(quantity)
                    }}>+</button>
                </div>
              </div>
              :null}
    }*/