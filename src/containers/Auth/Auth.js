import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions/index'
import classes from './Auth.css'
import Spinner from '../../components/UI/Spinner/Spinner'

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
    },
    isSignup: true
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

  submitHandler = event => {
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      }
    })
  }

  render () {
    const formElements = Object.keys(this.state.controls).map(key => {
      return {
        id: key,
        config: this.state.controls[key]
      }
    })

    let form = formElements.map(element => <Input key={element.id}
      elementType={element.config.elementType}
      elementConfig={element.config.elementConfig}
      value={element.config.value}
      invalid={!element.config.valid}
      shouldValidate={element.config.validation}
      touched={element.config.touched}
      changed={event => this.inputChangedHandler(event, element.id)}/>
    )

    if (this.props.loading) {
      form = <Spinner/>
    }

    let errorMessage = null
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type='Success'>Submit</Button>
          <Button type='Danger' onClick={this.switchAuthModeHandler}>Switch to {this.state.isSignup? 'Signin': 'Signup'}</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
