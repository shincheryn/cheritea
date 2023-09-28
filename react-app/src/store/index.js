import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import drinksReducer from './drink';
import toppingsReducer from './topping';
import ordersReducer from './order';
import reviewsReducer from './review';

const rootReducer = combineReducers({
  session,
  drink: drinksReducer,
  topping: toppingsReducer,
  order: ordersReducer,
  review: reviewsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
