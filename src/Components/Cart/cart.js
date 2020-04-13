import React from 'react';
import Stripe from '../Stripe/checkout';
import { Link } from 'react-router-dom';
import './cart.css';

class Cart extends React.Component{
    render(){
        let sum = 0;
        let description='';
        if(this.props.cart.length>0){
        this.props.cart.forEach(item=>{
            sum+=item.price*item.quantity*100
            description+=`${item.color} ${item.name}(${item.quantity}), `
            return sum
            
        })
    };
        return (
            <div id='cartWrapper'>
                <div className='itemWrapper'>
                    {this.props.cart.length===0? 
                        <h1 style={{color:'rgb(96, 73, 139)'}}>Your Cart is empty!</h1>:
                        this.props.cart.map(item=>{
                        return (
                            <div  className='cartItem' key={item.itemId+'_'+item.color}>
                                <div className='cartRow rowOne'>
                                    <img id='itemImg' src={item.source} alt={item.name}/>
                                </div>
                                <div className='cartRow rowTwo'>
                                <Link to={`/store/${item.tag}/${item.itemId}`} className='cartLink'>
                                    <p>{item.name}</p>
                                </Link>
                                    <p><span>Size:</span> {item.size}</p>
                                    <p><span>Color:</span> {item.color}</p>
                                </div>
                                <div className='cartRow rowThree'>
                                    <div id='quantityInput'>	
                                        <button type="button" style={{paddingBottom:'5px'}} onClick={(e)=>this.props.handleQuantityDec(e,item.itemId,item.color)}>-</button>
                                        <h3 className='quantity'>{item.quantity}</h3>
                                        <button type="button" onClick={(e)=>this.props.handleQuantityInc(e,item.itemId,item.color)}>+</button>
                                    </div>
                                    <p>${item.price}/ea.</p>
                                    <button className='remove' onClick={(e)=>this.props.handleRemove(e,item.itemId,item.color)}>Remove</button>
                                </div>
                                <div className='cartRow rowFour'>
                                    <h2>${item.price *item.quantity}</h2>
                                </div>
                    </div>)
                    })}
                </div>
                {this.props.cart.length===0
                    ?<h1 style={{color:'rgb(96, 73, 139)'}}>Add Something to your cart</h1>
                    :<div className='cartDetails'>
                        <h2 style={{textAlign:'center'}}>Order Summary</h2>
                        <h3>Subtotal: <span>${sum/100}</span></h3>
                        <h3>Shipping: <span>$5</span></h3>
                        <h3>Total: <span>${sum/100+5}</span></h3>
                        <Stripe 
                            money={sum+500}
                            description={description}
                            
                        />
                    </div>
                }

            </div>
        )
    }
};

export default Cart;


