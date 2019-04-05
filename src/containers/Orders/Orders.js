import React, { Component } from 'react'

import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json').then(response => {
      const orders = Object.keys(response.data).map(id => {
        return { ...response.data[id], id }
      })
      this.setState({ orders, loading: false })

    }).catch(error => {
      console.log(error)
    }).then(() => {
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price}/>)}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)
