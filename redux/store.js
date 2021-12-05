import { createStore, applyMiddleware } from "redux"
import { HYDRATE, createWrapper } from "next-redux-wrapper"
import thunkMiddleware from "redux-thunk"
import reducers from "./reducers/reducers"

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension")
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      }
    default:
      return reducers(state, action)
  }
}

const initStore = (initialState) => {
  return createStore(reducer, initialState, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)
