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
      fontFamily:'Josefin Sans',
        }
  });
  
  
  class StoreTest extends React.Component{

      render(){
                      return (
                       this.props.items.map(item=>{
                           return ( <ThemeProvider key={item.itemId} theme={theme}>
                            <Card className='card'>
                              <Link to={`/store/${item.tags[0]}/${item.itemId}`} className='storeLink'>
                                <CardMedia
                                  image={item.source}
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
                                    {item.name}
                                  </Typography>
                                  <Typography style={{color:'black'}} variant="body2" color="textSecondary" component="p">
                                    ${item.price}.00
                                  </Typography>
                                </CardContent> 
                            </Card>
                            </ThemeProvider>)
                       })
                      )

      }
    }
    
    export default StoreTest;