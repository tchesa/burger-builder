import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(control => <BuildControl key={control.type} label={control.label} added={() => props.ingredientAdded(control.type)} removed={() => props.ingredientRemoved(control.type)} disabled={props.disabledInfo[control.type]}/>)}
  </div>
)

export default buildControls
