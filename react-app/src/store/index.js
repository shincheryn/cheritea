import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import drinksReducer from './drink';
import toppingsReducer from './topping';
import ordersReducer from './order';
import reviewsReducer from './review';
import cartReducer from './cart'

const rootReducer = combineReducers({
  session,
  drinks: drinksReducer,
  toppings: toppingsReducer,
  orders: ordersReducer,
  reviews: reviewsReducer,
  cart: cartReducer,
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
