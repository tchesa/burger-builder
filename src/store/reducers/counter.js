import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT: return updateObject(state, { counter: state.counter + 1 }) // utility function example
    case actionTypes.DECREMENT: return updateObject(state, { counter: state.counter - 1 })
    case actionTypes.ADD:       return updateObject(state, { counter: state.counter + action.amount })
    case actionTypes.SUBTRACT:  return updateObject(state, { counter: state.counter - action.amount })
    default: return state
  }
}

export default reducer
