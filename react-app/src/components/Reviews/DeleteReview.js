import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/review";
import "../CSS/DeleteForm.css";

function DeleteReview({ reviewId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const confirmButtonHandler = async () => {
    await dispatch(reviewActions.deleteReviewThunk(reviewId));
    closeModal();
    history.push("/reviews/");
  };

  return (
    <div className="delete-form-container">
      <h1 className="delete-form-title">Confirm Delete</h1>
      <h5 className="delete-form-message">
        Are you sure you want to delete this review?
      </h5>
      <button className="delete-button" onClick={confirmButtonHandler}>
        Yes (Delete Review)
      </button>
      <button className="cancel-button" onClick={closeModal}>
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteReview;
