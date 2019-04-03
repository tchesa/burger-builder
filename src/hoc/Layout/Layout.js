import React, { Component } from 'react'

import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true})
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Toolbar toggleSidedrawer={this.sideDrawerOpenHandler}/>
          <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}

export default Layout
