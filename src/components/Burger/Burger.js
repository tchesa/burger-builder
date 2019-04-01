import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
  const transformedIngredients = Object.keys(props.ingredients).map(ingredient => {
    return [...Array(props.ingredients[ingredient])].map((_, i) => <BurgerIngredient key={ingredient+i} type={ingredient}/>)
  })
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {/* <BurgerIngredient type='cheese'/> */}
      {/* <BurgerIngredient type='meat'/> */}
      {transformedIngredients.map(ingredient => ingredient)}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  )
}

export default burger
