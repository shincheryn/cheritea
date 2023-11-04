const INCREASE_ITEM_QUANTITY = "cart/increaseCartItemQuantity";
const DECREASE_ITEM_QUANTITY = "cart/decreaseCartItemQuantity";
const ADD_CART_ITEM = "cart/addCartItem";
const REMOVE_CART_ITEM = "cart/removeCartItem";
const EMPTY_CART_ITEMS = "cart/emptyCartItems";

//Action Creators
export const increaseCartItemQuantity = (cartIndex) => ({
  type: INCREASE_ITEM_QUANTITY,
  payload: cartIndex,
});

export const decreaseCartItemQuantity = (cartIndex) => ({
  type: DECREASE_ITEM_QUANTITY,
  payload: cartIndex,
});

export const addCartItem = (order) => ({
  type: ADD_CART_ITEM,
  payload: order,
});

export const removeCartItem = (cartIndex) => ({
  type: REMOVE_CART_ITEM,
  payload: cartIndex,
});

export const emptyCartItems = () => ({
  type: EMPTY_CART_ITEMS,
});

//Reducer
const initialState =
  sessionStorage.getItem("cart") == null
    ? []
    : JSON.parse(sessionStorage.getItem("cart"));
console.log(initialState);
const cartReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case ADD_CART_ITEM:
      newState.push({ order: action.payload, quantity: 1 });
      sessionStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case REMOVE_CART_ITEM:
      newState.splice(action.payload, 1);
      sessionStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case INCREASE_ITEM_QUANTITY:
      newState[action.payload].quantity += 1;
      sessionStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case DECREASE_ITEM_QUANTITY:
      newState[action.payload].quantity -= 1;
      if (newState[action.payload].quantity === 0) {
        newState.splice(action.payload, 1);
      }
      sessionStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case EMPTY_CART_ITEMS:
      sessionStorage.setItem("cart", JSON.stringify([]));
      return [];
    default:
      return state;
  }
};

export default cartReducer;
