import React, { Component } from 'react'

import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show
  }

  render() {
    return (
      <React.Fragment>
        <div className={classes.Modal} style={{
          transform: this.props.show? 'translateY(0)': 'translateY(-100vh)',
          opacity: this.props.show? 1: 0
        }}>
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} onClick={this.props.modalClosed}/>
      </React.Fragment>
    )
  }
}

export default Modal
