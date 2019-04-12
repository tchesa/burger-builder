import React from 'react'

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>Burger Builer</NavigationItem>
    <NavigationItem link='/orders'>Orders</NavigationItem>
  </ul>
)

export default navigationItems