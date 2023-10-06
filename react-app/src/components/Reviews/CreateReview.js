import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as reviewActions from "../../store/review";

const CreateReviewPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderId } = useParams();
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Review Text: If empty, throw an error
    if (reviewText.trim() === "") {
      setError("Please add a review text");
      return;
    }

    // Review Stars: If empty, throw an error
    if (reviewStars.trim() === "") {
      setError("Please add a star rating");
      return;
    }

    // Star rating must be between 1 & 5
    const starRating = parseInt(reviewStars);
    if (starRating < 1 || starRating > 5) {
      setError("Star rating must be between 1 and 5");
      return;
    }

    await dispatch(
      reviewActions.addReviewThunk(orderId, {
        review: reviewText,
        stars: starRating,
      })
    );
    history.push(`/reviews/${orderId}`);
  };

  return (
    <div className="create-review-container">
      <div className="centered-content">
        <h1 className="create-review-title">Create a Review</h1>
        <form className="create-review-form" onSubmit={handleSubmit}>
          <div>
            <label className="create-review-label">
              Review Text
              <textarea
                className="create-review-input"
                placeholder="Review Text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </label>
            <label className="create-review-label">
              Star Rating
              <input
                className="create-review-input"
                type="number"
                placeholder="Star Rating (1-5)"
                value={reviewStars}
                onChange={(e) => setReviewStars(e.target.value)}
              />
            </label>
            {error && <p className="create-review-error-message">{error}</p>}
          </div>
          <button className="create-review-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReviewPage;
