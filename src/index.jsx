import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers/reducer.js'
import * as reduxLogger from 'redux-logger'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App'
import Example from './containers/Example'

import 'bootstrap/dist/css/bootstrap.css'

import './styles/main.scss'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(reduxLogger.default())
}

const store = createStore(reducer, applyMiddleware(...middlewares))
store.dispatch({
  type: 'SET_STATE',
  state: {
    statefulProperty: Math.random().toString(36).substring(7)
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Example} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
