import React, { Component } from 'react'

import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-bdd91.firebaseio.com/ingredients.json').then(response => {
      this.setState({ingredients: response.data})
    }).catch(error => {
      this.setState({error: true})
    })
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

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // alert('You continue!')
    /* this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Cesar',
        address: {
          street: 'Teststreet 1',
          zipcode: '35400-000',
          country: 'Brazil'
        },
        email: 'cesar@gmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order).then(response => {
      // console.log(response)
    }).catch(error => {
      // console.log(error)
    }).then(() => {
      this.setState({loading: false, purchasing: false})
    }) */
    const queryParams = []
    for (let i in this.state.ingredients) queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) disabledInfo[key] = this.state.ingredients[key] <= 0

    const loadingObject = this.state.error? <p>Ingredients can't be loaded</p>: <Spinner />

    return (
      <React.Fragment>
        {this.state.ingredients? <Burger ingredients={this.state.ingredients}/>: loadingObject}
        <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabledInfo={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable} ordered={this.purchaseHandler}/>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {this.state.loading? <Spinner />: (this.state.ingredients? <OrderSummary ingredients={this.state.ingredients} purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} price={this.state.totalPrice}/>: null)}
        </Modal>
      </React.Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
