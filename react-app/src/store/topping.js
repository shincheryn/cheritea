const LOAD_ALL_TOPPINGS = "toppings/allToppings";
const LOAD_TOPPING_BY_ID = "toppings/toppingById";
const ADD_TOPPING = "toppings/addTopping";
const EDIT_TOPPING = "toppings/editTopping";
const DELETE_TOPPING = "toppings/deleteTopping";

//Action Creators
export const loadAllToppings = (toppings) => ({
  type: LOAD_ALL_TOPPINGS,
  payload: toppings,
});

export const loadToppingById = (topping) => ({
  type: LOAD_TOPPING_BY_ID,
  payload: topping,
});

export const addTopping = (topping) => ({
  type: ADD_TOPPING,
  payload: topping,
});

export const editTopping = (topping) => ({
  type: EDIT_TOPPING,
  payload: topping,
});

export const deleteTopping = (toppingId) => ({
  type: DELETE_TOPPING,
  payload: toppingId,
});

//Thunks
export const loadAllToppingsThunk = () => async (dispatch) => {
  const res = await fetch("/api/toppings/");
  if (res.ok) {
    const toppings = await res.json();
    dispatch(loadAllToppings(toppings));
    return toppings;
  }
};

export const loadToppingByIdThunk = (toppingId) => async (dispatch) => {
  const res = await fetch(`/api/toppings/${toppingId}`);
  if (res.ok) {
    const topping = await res.json();
    dispatch(loadToppingById(topping));
    return topping;
  }
};

export const addToppingThunk = (newTopping) => async (dispatch) => {
  const res = await fetch("/api/toppings/", {
    method: "POST",
    body: newTopping,
  });

  if (res.ok) {
    const topping = await res.json();
    dispatch(addTopping(topping));
    return topping;
  }
};

export const editToppingThunk =
  (toppingId, updatedTopping) => async (dispatch) => {
    const res = await fetch(`/api/toppings/${toppingId}`, {
      method: "PUT",
      body: updatedTopping,
    });

    if (res.ok) {
      const updated = await res.json();
      dispatch(editTopping(updated));
      return updated;
    }
  };

export const deleteToppingThunk = (toppingId) => async (dispatch) => {
  const res = await fetch(`/api/toppings/${toppingId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(deleteTopping(toppingId));
  }
};

//Reducer
const initialState = {};

const toppingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ALL_TOPPINGS:
      action.payload.forEach((ea) => {
        newState[ea.id] = ea;
      });
      return newState;
    case LOAD_TOPPING_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_TOPPING:
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_TOPPING:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_TOPPING:
      delete newState[action.payload];
      return newState;
    default:
      return newState;
  }
};

export default toppingReducer;
