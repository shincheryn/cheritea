const LOAD_ORDERS_BY_USER_ID = "orders/ordersByUserId";
const ADD_ORDER = "orders/addOrder";
const EDIT_ORDER = "orders/editOrder";
const DELETE_ORDER = "orders/deleteOrder";

//Action Creators
export const loadOrdersByUserId = (orders) => ({
  type: LOAD_ORDERS_BY_USER_ID,
  payload: orders,
});

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const editOrder = (order) => ({
  type: EDIT_ORDER,
  payload: order,
});

export const deleteOrder = (orderId) => ({
  type: DELETE_ORDER,
  payload: orderId,
});

//Thunks
export const loadOrdersByUserIdThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/orders/${userId}`);
  if (res.ok) {
    const orders = await res.json();
    dispatch(loadOrdersByUserId(orders));
    return order;
  }
};

export const addOrderThunk = (orderId, newOrder) => async (dispatch) => {
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "POST",
    body: newOrder,
  });

  if (res.ok) {
    const order = await res.json();
    dispatch(addOrder(order));
    return order;
  }
};

export const editOrderThunk = (orderId, updatedOrder) => async (dispatch) => {
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "PUT",
    body: updatedOrder,
  });

  if (res.ok) {
    const updated = await res.json();
    dispatch(editOrder(updated));
    return updated;
  }
};

export const deleteOrderThunk = (orderId) => async (dispatch) => {
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(deleteOrder(orderId));
  }
};

//Reducer
const initialState = {};

const orderReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ORDERS_BY_USER_ID:
      action.payload.forEach((ea) => {
        newState[ea.id] = ea;
      });
      return newState;
    case ADD_ORDER:
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_ORDER:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_ORDER:
      delete newState[action.payload];
      return newState;
    default:
      return newState;
  }
};

export default orderReducer;
