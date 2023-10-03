const LOAD_REVIEW_BY_ID = "reviews/reviewById";
const ADD_REVIEW = "reviews/addReview";
const EDIT_REVIEW = "reviews/editReview";
const DELETE_REVIEW = "reviews/deleteReview";

//Action Creators
export const loadReviewById = (review) => ({
  type: LOAD_REVIEW_BY_ID,
  payload: review,
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

export const editReview = (review) => ({
  type: EDIT_REVIEW,
  payload: review,
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId,
});

//Thunks
export const loadReviewByIdThunk = (orderId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${orderId}`);
  if (res.ok) {
    const review = await res.json();
    dispatch(loadReviewById(review));
    return review;
  }
};

export const addReviewThunk = (orderId, newReview) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${orderId}`, {
    method: "POST",
    body: newReview,
  });

  if (res.ok) {
    const review = await res.json();
    dispatch(addReview(review));
    return review;
  }
};

export const editReviewThunk = (orderId, updatedReview) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${orderId}`, {
    method: "PUT",
    body: updatedReview,
  });

  if (res.ok) {
    const updated = await res.json();
    dispatch(editReview(updated));
    return updated;
  }
};

export const deleteReviewThunk = (orderId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${orderId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return dispatch(deleteReview(orderId));
  }
};

//Reducer
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_REVIEW_BY_ID:
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_REVIEW:
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_REVIEW:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.payload];
      return newState;
    default:
      return newState;
  }
};

export default reviewsReducer;
