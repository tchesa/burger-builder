import React from 'react'

import Button from '../../UI/Button/Button'

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>)
  return (
    <React.Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button type='Danger' onClick={props.purchaseCanceled}>CANCEL</Button>
      <Button type='Success' onClick={props.purchaseContinued}>CONTINUE</Button>
    </React.Fragment>
  )
}

export default orderSummary
