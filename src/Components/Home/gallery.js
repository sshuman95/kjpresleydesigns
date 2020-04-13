import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Typography from '@material-ui/core/Typography';

class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          items:this.props.items,
          index:0
        };
        this.nextCard = this.nextCard.bind(this);
        this.prevCard = this.prevCard.bind(this);
    }

    nextCard(){
        let index = this.state.index;
        if(index === 2){
            this.setState({
                index:0,
            })
        } else {
            index+=1
            this.setState({
                index:index,
            })
        }
    }

    prevCard(){
        let index = this.state.index;
        if(index === 0){
            this.setState({
                index:2
            })
        } else {
            index-=1
            this.setState({
                index:index
            })
        }
    }

  
    render(){
        let index = this.state.index;
        let card = this.state.items[index];
        return(
        <div>
            <div key={card.itemId} className={`nRow${index}`}>
              <Link to={`/store/${card.tag}/${card.itemId}`} className='storeLink'>
                <img className='itemImg' style={{margin:'0 auto'}} alt={card.name} src={card.source}/>
              </Link>
              <Typography variant="body2" component="p">
                  {card.tag}
              </Typography>
              <Typography variant="body2" component="p">
                  {card.name}
              </Typography>
              <Typography variant="body2" component="p">
                ${card.price}.00
              </Typography>
            </div>
            <div className='directionBtn'>
                <button onClick={this.nextCard}>next</button>    
                <button onClick={this.prevCard}>prev</button>    
            </div> 
            </div>  
                )
    }
  };
  export default Gallery;