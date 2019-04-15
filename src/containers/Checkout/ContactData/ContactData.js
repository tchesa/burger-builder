import React, { Component } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest', displayValue: 'Fastest'
            }, {
              value: 'cheapest', displayValue: 'Cheapest'
            }
          ]
        },
        value: ''
      }
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = event => {
    event.preventDefault()

    this.setState({loading: true})

    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order).then(response => {
      this.props.history.push('/')
    }).catch(error => {
      // console.log(error)
    }).then(() => {
      this.setState({loading: false})
    })
  }

  checkValidity = (value, rules) => {
    let isValid = false
    if (!rules) return true

    if (rules.required) {
      isValid = value.trim() !== ''
    }
    if (isValid && rules.minLength) {
      isValid = value.length >= rules.minLength
    }
    if (isValid && rules.maxLength) {
      isValid = value.length <= rules.maxLength
    }
    return isValid
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = updatedFormElement.touched || !!event.target.value
    updatedOrderForm[inputId] = updatedFormElement

    let formIsValid = true
    for (let id in updatedOrderForm) {
      if (!updatedOrderForm[id].validation) continue
      formIsValid = formIsValid && updatedOrderForm[id].valid
      if (!formIsValid) break
    }

    this.setState({orderForm: updatedOrderForm, formIsValid})
  }

  render() {
    const formElements = Object.keys(this.state.orderForm).map(key => {
      return {
        id: key,
        config: this.state.orderForm[key]
      }
    })

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button type='Success' disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.price
  }
}

export default connect(mapStateToProps)(ContactData)
