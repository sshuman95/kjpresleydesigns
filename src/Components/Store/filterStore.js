import React from 'react';
import axios from 'axios';
import './store.css';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Loading from '../misc/loading';
import { Link } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily:'Josefin Sans'
  },
});


class FilterStore extends React.Component{


  constructor(props){
    super(props);
    this.state={
      items:[],
      tag:null,
      error:false
    }
    this.getItem=this.getItem.bind(this);
  };

  componentDidMount(){
      window.scrollTo(0, 0);
      this.getItem(this.props.tag.match.params.tag);
  };

  getItem(tag){
    axios.get(`/items/${tag}`
    )
    .then(res=>{
      if(res.data.length===0){
        this.setState({
          error:true
        })
      } else{
      let items = [];
      res.data.forEach(item=>{
        items.push(item)
      })
      this.setState({
        items:items,
        tag:this.props.tag.match.params.tag,
        error:false
      })}
    })
    .catch(err=>{
      console.log(err)
    })
  };



  static getDerivedStateFromProps(props, state) {
    if (props.tag.match.params.tag !== state.tag) {
        window.scrollTo(0, 0);
        return {tag:props.tag.match.params.tag}
    }
   
    // Return null if the state hasn't changed
    return null;
  };


  componentDidUpdate(prevProps) {
    if (this.props.tag.match.params.tag !== prevProps.tag.match.params.tag) {
      this.setState({items:[]})
      this.getItem(this.props.tag.match.params.tag)
    }
  };


    render(){
      let items = this.state.items;
      return (
        <div id='storeContainer'>
           {this.state.error?'':<h2 className='storeHeader'>{this.props.tag.match.params.tag}</h2>}
            <div id='itemContainer'>
            {this.state.error?<div id='errorStoreDiv'>
              <h1>We could't find what you were looking for.</h1>
              <h3>Check back soon!</h3>
            </div>:this.state.items.length===0?<Loading></Loading>:
                  items.map(item=>{
                    return (
                      <ThemeProvider key={item.itemId} theme={theme}>
                      <Card className='card'>
                        <Link to={`/store/${item.tags[0]}/${item.itemId}`} className='storeLink'>
                          <CardMedia
                            image={item.newColors[0].source}
                            title={item.name}
                           className='cardMedia'
                          />
                          </Link>
                          <CardContent style={{padding:'15px 0 0 0'}} className='cardContent'>
                          <div className='tagContainer'>   
                          {item.tags.map(tag=>{
                              return ( 
                              <Typography key={tag} style={{padding:'0 5px 0 0'}} variant="body2" component="p">
                              <Link stlye={{textDecoration:'none'}} to={`/store/${tag}`} className='storeLink'>
                              {tag} /
                              </Link>
                              </Typography>)
                            })}
                            </div>
                            <Typography style={{color:'black'}} variant="body2" color="textSecondary" component="p">
                              ${item.price}.00
                            </Typography>
                            <Typography style={{color:'black'}} variant="body2" color="textSecondary" component="p">
                              {item.name}
                            </Typography>
                            
                          </CardContent> 
                      </Card>
                      </ThemeProvider>
                    )
                })}
            </div>
          </div>
      )
    }
  }
  
  export default FilterStore;