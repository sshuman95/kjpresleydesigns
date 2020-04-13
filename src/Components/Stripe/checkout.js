import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import './stripe.css'; 


export default class Stripe extends React.Component {
  onToken = (token) => {
    let amount = this.props.money;
    let description = this.props.description;
    let currency="USD";
    fetch('/charge', {
      method: 'POST',
      body: JSON.stringify({token,
        charge:{
            amount,currency,description
        }}),
    }).then(response => {
      response.json().then(data => {
        console.log(data)
      });
    })
    .catch(err=>{
      console.log(err)
    })
  }

 
 
  render() {

    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_kfycPlsK2S5nbrLMcFdoxriD006UR2lB7g"
        amount={this.props.money}// cents
        currency="USD"
        description={this.props.description}
        shippingAddress
        name="KJ Presley Designs"
      />
    )
  }
};


