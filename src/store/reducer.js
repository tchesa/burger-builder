import * as actionTypes from './actions'

const initialState = {
  persons: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD: return {
      persons: state.persons.concat({
        id: Math.random(), // not really unique but good enough here!
        name: 'Max',
        age: Math.floor(Math.random() * 40)
      })
    }
    case actionTypes.REMOVE: return { persons: state.persons.filter(person => person.id !== action.id)}
    default: return state
  }
}

export default reducer
