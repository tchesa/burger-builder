import React from 'react'

import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = props => (
  <React.Fragment>
    <div>
      {/* Toolbar, SideDrawer, Backdrop */}
      <Toolbar />
    </div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </React.Fragment>
)

export default layout
