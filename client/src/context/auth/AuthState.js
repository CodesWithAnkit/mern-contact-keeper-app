import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERROR,
  LOGOUT,
} from '../types'

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loding: true,
    error: null,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load user

  //   Register user

  //   Login user

  // LogOUt user

  //   Clear Error

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        loading: state.loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
