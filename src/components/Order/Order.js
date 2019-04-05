import React from 'react'

import classes from './Order.css'

const order = props => {

  const ingredients = []
    for (let ingredientName in props.ingredients) ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})

  return (
    <div className={classes.Order}>
      <p>Ingredients:</p>
      <ul>
        {Object.keys(props.ingredients).map(key => {
          return props.ingredients[key] > 0? <li key={key}>{key + ': (' + props.ingredients[key] + ')'}</li>: null
        })}
      </ul>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
}
export default order
