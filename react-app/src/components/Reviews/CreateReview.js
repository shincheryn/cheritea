import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as reviewActions from "../../store/review";
import "../CSS/CreateForm.css";

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
      setError("Please add a review");
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
    <div className="form-container">
      <div className="centered-content">
        <h1 className="form-title">Create a Review</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">
              Review Text
              <textarea
                className="form-input"
                placeholder="Review Text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </label>
            <label className="form-label">
              Star Rating
              <input
                className="form-input"
                type="number"
                placeholder="Star Rating (1-5)"
                value={reviewStars}
                onChange={(e) => setReviewStars(e.target.value)}
              />
            </label>
            {error && <p className="form-error-message">{error}</p>}
          </div>
          <button className="form-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReviewPage;
