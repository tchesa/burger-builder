import React, { Component } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = event => {
    event.preventDefault()

    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      this.props.history.push('/')
    }).catch(error => {
      // console.log(error)
    }).then(() => {
      this.setState({loading: false})
    })
  }

  render() {
    let form = (
      <form>
        <Input inputtype='input' className={classes.Input} type='text' name='name' placeholder='Your name'/>
        <Input inputtype='input' className={classes.Input} type='email' name='email' placeholder='Your e-mail'/>
        <Input inputtype='input' className={classes.Input} type='text' name='street' placeholder='Street'/>
        <Input inputtype='input' className={classes.Input} type='text' name='postal' placeholder='Postal code'/>
        <Button type='Success' onClick={this.orderHandler}>ORDER</Button>
      </form>
    )
    if (this.state.loading) form = <Spinner />
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
