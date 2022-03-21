import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { rootReducer } from './redux/rootReducer'

import './resources/index.css'

const finalReducer = combineReducers({
  rootReducer: rootReducer
})

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : []
  }
}

const store = createStore(finalReducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)