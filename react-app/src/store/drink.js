const LOAD_ALL_DRINKS = "drinks/allDrinks";
const LOAD_DRINK_BY_ID = "drinks/drinkById";
const ADD_DRINK = "drinks/addDrink";
const EDIT_DRINK = "drinks/editDrink";
const DELETE_DRINK = "drinks/deleteDrink";

//Action Creators
export const loadAllDrinks = (drinks) => ({
  type: LOAD_ALL_DRINKS,
  payload: drinks,
});

export const loadDrinkById = (drink) => ({
  type: LOAD_DRINK_BY_ID,
  payload: drink,
});

export const addDrink = (drink) => ({
  type: ADD_DRINK,
  payload: drink,
});

export const editDrink = (drink) => ({
  type: EDIT_DRINK,
  payload: drink,
});

export const deleteDrink = (drinkId) => ({
  type: DELETE_DRINK,
  payload: drinkId,
});


//Thunks
export const loadAllDrinksThunk = () => async (dispatch) => {
  const res = await fetch("/api/drinks/");
  if (res.ok) {
    const drinks = await res.json();
    dispatch(loadAllDrinks(drinks));
    return drinks;
  }
};

export const loadDrinkByIdThunk = (drinkId) => async (dispatch) => {
  const res = await fetch(`/api/drinks/${drinkId}`);
  if (res.ok) {
    const drink = await res.json();
    dispatch(loadDrinkById(drink));
    return drink;
  }
};

export const addDrinkThunk = (newDrink) => async (dispatch) => {
  const res = await fetch("/api/drinks/", {
    method: "POST",
    body: newDrink,
  });

  if (res.ok) {
    const drink = await res.json();
    dispatch(addDrink(drink));
    return drink;
  }
};

export const editDrinkThunk = (drinkId, updatedDrink) => async (dispatch) => {
  const res = await fetch(`/api/drinks/${drinkId}`, {
    method: "PUT",
    body: updatedDrink,
  });

  if (res.ok) {
    const updated = await res.json();
    dispatch(editDrink(updated));
    return updated;
  }
};

export const deleteDrinkThunk = (drinkId) => async (dispatch) => {
  const res = await fetch(`/api/drinks/${drinkId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(deleteDrink(drinkId));
  }
};


//Reducer
const initialState = {};

const drinkReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ALL_DRINKS:
      action.payload.Drink.forEach((ea) => {
        newState[ea.id] = ea;
      });
      return newState;
    case LOAD_DRINK_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_DRINK:
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_DRINK:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_DRINK:
      delete newState[action.payload];
      return newState;
    default:
      return newState;
  }
};

export default drinkReducer;
