import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/review";

const EditReviewPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderId, reviewId } = useParams();
  const review = useSelector((state) => state.reviews[reviewId]);
  const [reviewText, setReviewText] = useState(review?.review || "");
  const [reviewStars, setReviewStars] = useState(review?.stars || 0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!review) {
      dispatch(reviewActions.loadReviewByIdThunk(orderId))
        .then((loadedReview) => {
          if (loadedReview) {
            setReviewText(loadedReview.review);
            setReviewStars(loadedReview.stars);
          }
        })
        .catch((err) => {
          console.error("Error fetching review details:", err);
        });
    }
  }, [dispatch, orderId, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText) {
      setErrors({ reviewText: "Review text is required" });
    } else {
      setErrors({});
      dispatch(reviewActions.editReviewThunk(orderId, reviewId, { review: reviewText, stars: reviewStars }))
        .then(() => {
          history.push(`/reviews/${orderId}/${reviewId}`);
        })
        .catch((err) => {
          console.error("Error editing review:", err);
        });
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="form-create">
          <h1>Edit Review</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="error-message">
                {errors.reviewText && <p>{errors.reviewText}</p>}
              </div>
              <label className="label-create">
                Review Text
                <textarea
                  className="input-create"
                  name="review-text"
                  placeholder="Review Text"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="label-create">
                Star Rating
                <input
                  type="number"
                  name="star-rating"
                  placeholder="Star Rating"
                  value={reviewStars}
                  onChange={(e) => setReviewStars(e.target.value)}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditReviewPage;
