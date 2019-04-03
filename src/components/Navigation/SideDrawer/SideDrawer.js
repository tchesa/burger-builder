import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = props => {

  const attachedClasses = [classes.SideDrawer, props.show? classes.Open: classes.Close]

  return (
    <React.Fragment>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
      <Backdrop show={props.show} onClick={props.closed}/>
    </React.Fragment>
  )
}

export default sideDrawer
