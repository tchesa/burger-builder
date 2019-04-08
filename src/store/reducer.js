const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
  if (action.type === 'INCREMENT') {
    return {
      counter: state.counter + 1
    }
  } else if (action.type === 'DECREMENT') {
    return {
      counter: state.counter - 1
    }
  } else if (action.type === 'ADD') {
    return {
      counter: state.counter + action.amount
    }
  } else if (action.type === 'SUBTRACT') {
    return {
      counter: state.counter - action.amount
    }
  }
  return state
}

export default reducer
