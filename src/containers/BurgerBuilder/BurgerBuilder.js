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
    purchasable: false,
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
    this.setState({purchasable: sum > 0})
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
      price: this.props.totalPrice,
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
    for (let i in this.props.ingredients) queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
    queryParams.push('price=' + this.props.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    const disabledInfo = { ...this.props.ingredients }
    for (let key in disabledInfo) disabledInfo[key] = this.props.ingredients[key] <= 0

    const loadingObject = this.state.error? <p>Ingredients can't be loaded</p>: <Spinner />

    return (
      <React.Fragment>
        {this.props.ingredients? <Burger ingredients={this.props.ingredients}/>: loadingObject}
        <BuildControls ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} disabledInfo={disabledInfo} price={this.props.totalPrice} purchasable={this.state.purchasable} ordered={this.purchaseHandler}/>
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
