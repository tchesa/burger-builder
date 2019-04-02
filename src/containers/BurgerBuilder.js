import React, { Component } from 'react'

import Burger from '../components/Burger/Burger'
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary'

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
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = (updatedIngredients) => {
    const sum = Object.keys(updatedIngredients).reduce((s, el) => s + updatedIngredients[el], 0)
    this.setState({purchasable: sum > 0})
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
    this.updatePurchaseState(ingredients)
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
    this.updatePurchaseState(ingredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) disabledInfo[key] = this.state.ingredients[key] <= 0

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabledInfo={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable} ordered={this.purchaseHandler}/>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
      </React.Fragment>
    )
  }
}

export default BurgerBuilder
