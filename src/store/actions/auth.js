import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnScureToken: true
    }
    const key = 'AIzaSyChLMxKgayTfuusdu61u8oeEuVGLGOlYCw'
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
    if (isSignup) url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
    axios.post(url, authData).then(response => {
      console.log(response)
      dispatch(authSuccess(response.data.idToken, response.data.localId))
    }).catch(error => {
      console.log(error)
      dispatch(authFail())
    })
  }
}
