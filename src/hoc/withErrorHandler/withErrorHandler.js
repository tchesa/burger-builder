import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    constructor() {
      super()
      this.state = {
        error: null
      }

      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null})
        return req
      })
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      })
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor)
      axios.interceptors.response.eject(this.responseInterceptor)
    }

    render() {
      // console.log(this)
      return (
        <React.Fragment>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error? this.state.error.message: null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      )
    }
  }
}

export default withErrorHandler
