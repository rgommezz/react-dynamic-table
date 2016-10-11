import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

// Thunk middleware for async actions
const middleware = [thunk];

// Chrome redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    autoRehydrate(),
    applyMiddleware(...middleware),
  )
);

// Persisting all state due to its simplicity
persistStore(store, {
  keyPrefix: 'ReactTabularApp:'
});

export default store;
