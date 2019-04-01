import React, { Component } from 'react'

import Burger from '../components/Burger/Burger'
import BuildControls from '../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = type => {
    let ingredients = {
      ...this.state.ingredients
    }
    ingredients[type]++
    this.setState({
      ingredients,
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
    })
  }

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] === 0) return
    let ingredients = {
      ...this.state.ingredients
    }
    ingredients[type]--
    this.setState({
      ingredients,
      totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
    })
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) disabledInfo[key] = this.state.ingredients[key] <= 0

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabledInfo={disabledInfo}/>
      </React.Fragment>
    )
  }
}

export default BurgerBuilder
