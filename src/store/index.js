import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as actionCreators from '../actions';
import rootReducer from '../reducers';

const devToolExtensionEnhancer = window.devToolsExtension ? window.devToolsExtension({ actionCreators }) : f => f;
const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose( // Store Enhancers
    applyMiddleware(...middleware),
    devToolExtensionEnhancer
  )
);

export default store;
