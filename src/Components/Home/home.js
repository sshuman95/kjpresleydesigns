import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../misc/loading';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import Gallery from './gallery';
import './home.css';

// <Gallery items={items}/>
const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what the font-size on the html element is.
    fontFamily:'Josefin Sans',
  },
});

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items:[]
    };

  }



  componentDidMount(){
    let items = this.state.items;
    let newArr = [];
    axios.get('/items/all'
    )
    .then(res=>{
        res.data.forEach(item=>{
          items.push(item)
          newArr.push(item.addedAt._seconds)
          newArr.sort((x, y) => y - x)
      })
      return newArr
    })
    .then(()=>{
      let sortedList = []
        newArr.forEach((val)=>{
          items.filter(item=>{
            if(item.addedAt._seconds === val){
              sortedList.push(item);
            } 
            return sortedList
          })
        })
        this.setState({
          items:sortedList
        })
      })
    .catch(err=>{
      console.log(err)
    })
    };

  render(){
    let items = this.state.items.slice(0, 3);
    return (
      <div id='container'>
      <div className='banner'>
        <h1 style={{fontFamily:'Josefin Sans'}}>One of a kind</h1>
        <h3 style={{fontFamily:'Josefin Sans'}}>Knitting Creations</h3>
        <Link className='link' to='/store/All' stlye={{width:'45%'}}>
        <button>Shop Now</button>
        </Link>
      </div>
      <h1 className='test' >New Items</h1>
      <div className='newItems' >
        {items.length === 0?<Loading/>:items.map((item,index)=>{
            return (
              <ThemeProvider key={item.itemId} theme={theme}>
              <div  className={`nRow${index}`} >
              <Link to={`/store/${item.tags[0]}/${item.itemId}`} className='storeLink'>
                <img className='itemImg' style={{margin:'0 auto'}} alt={item.name} src={item.newColors[0].source}/>
              </Link>
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
              <Typography variant="body2" component="p">
                ${item.price}.00
              </Typography>
              <Typography variant="body2" component="p" >
                  {item.name}
              </Typography>
              </div>
              </ThemeProvider>
            )
            })
        }
            </div>
              <div id='collectionGrid'>
              <div className='col1'>
              <Link to={`/store/Toys`} className='homeLink'>
                <div style={{textAlign:'center'}}>
                  <h1 >Toys</h1>
                </div>
                </Link>
               {
                //<span style={{backgroundColor:'rgba(0,0,0,0.3)',height:'100%',width:'100%'}}>hello</span>
               }
              </div>
              <div className='col2'>
              <Link to={`/store/Scarves`} className='homeLink'>
              <div>
                  <h1>Scarves</h1>
                </div>
              </Link>
                </div>
              <div className='col3'>
              <Link to={`/store/Hats`} className='homeLink'>
              <div>
                  <h1>Hats</h1>
                </div>
              </Link>
              </div>
              <div className='col4'>
              <Link to={`/store/Blankets`} className='homeLink'>
              <div>
                  <h1>Blankets</h1>
                </div>
              </Link>
                </div>
              <div className='col5'>
              <Link to={`/store/Holiday`} className='homeLink'>
              <div>
                  <h1>Holiday</h1>
                </div>
              </Link>
                </div>
              </div>
      </div>
    )
  }
  };
  export default Home;