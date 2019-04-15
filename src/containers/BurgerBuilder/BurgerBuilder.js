import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('https://react-my-burger-bdd91.firebaseio.com/ingredients.json').then(response => {
    //   this.setState({ingredients: response.data})
    // }).catch(error => {
    //   this.setState({error: true})
    // })
  }

  updatePurchaseState = (updatedIngredients) => {
    const sum = Object.keys(updatedIngredients).reduce((s, el) => s + updatedIngredients[el], 0)
    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = { ...this.props.ingredients }
    for (let key in disabledInfo) disabledInfo[key] = this.props.ingredients[key] <= 0

    const loadingObject = this.state.error? <p>Ingredients can't be loaded</p>: <Spinner />

    return (
      <React.Fragment>
        {this.props.ingredients? <Burger ingredients={this.props.ingredients}/>: loadingObject}
        <BuildControls ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} disabledInfo={disabledInfo} price={this.props.totalPrice} purchasable={this.updatePurchaseState(this.props.ingredients)} ordered={this.purchaseHandler}/>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {this.state.loading? <Spinner />: (this.props.ingredients? <OrderSummary ingredients={this.props.ingredients} purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} price={this.props.totalPrice}/>: null)}
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredientName}),
    onIngredientRemoved: ingredientName => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredientName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
