import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import classes from './Auth.css'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({ controls: updatedControls })
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

  render () {
    const formElements = Object.keys(this.state.controls).map(key => {
      return {
        id: key,
        config: this.state.controls[key]
      }
    })

    const form = formElements.map(element => <Input key={element.id}
      elementType={element.config.elementType}
      elementConfig={element.config.elementConfig}
      value={element.config.value}
      invalid={!element.config.valid}
      shouldValidate={element.config.validation}
      touched={element.config.touched}
      changed={event => this.inputChangedHandler(event, element.id)}/>)

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button type='Success'>Submit</Button>
        </form>
      </div>
    )
  }
}

export default Auth
