import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/review";

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
    <div>
      <h1>Confirm Delete</h1>
      <h5>Are you sure you want to delete this review?</h5>
      <button className="deleteReviewButton" onClick={confirmButtonHandler}>
        Yes (Delete Review)
      </button>
      <button className="deleteReviewButton" onClick={closeModal}>
        No (Keep Review)
      </button>
    </div>
  );
}

export default DeleteReview;
