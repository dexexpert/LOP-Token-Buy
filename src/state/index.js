import { createStore, combineReducers } from 'redux'
// import { composeWithDevTools } from "redux-devtools-extension";

import application from './application/reducer'



// import { updateVersion } from './global/actions'

export default function configureStore(initialState) {
  const reducer = combineReducers({
    application,

  })
  const store = createStore(reducer ,initialState +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  // store.dispatch(updateVersion())
  return store
}