const INCREASE_ITEM_QUANTITY = "cart/increaseCartItemQuantity";
const DECREASE_ITEM_QUANTITY = "cart/decreaseCartItemQuantity";
const ADD_CART_ITEM = "cart/addCartItem";
const REMOVE_CART_ITEM = "cart/removeCartItem";
const SUBMIT_CART_ITEMS = "cart/submitCartItems";

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

export const submitCartItems = (orders) => ({
  type: SUBMIT_CART_ITEMS,
  payload: orders,
});


//Thunk
export const submitCartItemsThunk = (orders) => async (dispatch) => {
  const res = await fetch(`/api/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orders),
  });

  if (res.ok) {
    const order = await res.json();
    dispatch(submitCartItems(orders));
    return order;
  }
};


//Reducer
const initialState = [];
const cartReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case ADD_CART_ITEM:
      newState.push({ order: action.payload, quantity: 1 });
      return newState;
    case REMOVE_CART_ITEM:
      newState.splice(action.payload, 1);
      return newState;
    case INCREASE_ITEM_QUANTITY:
      newState[action.payload].quantity += 1;
      return newState;
    case DECREASE_ITEM_QUANTITY:
      newState[action.payload].quantity -= 1;
      if (newState[action.payload].quantity === 0) {
        newState.splice(action.payload, 1);
      }
      return newState;
    case SUBMIT_CART_ITEMS:
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
