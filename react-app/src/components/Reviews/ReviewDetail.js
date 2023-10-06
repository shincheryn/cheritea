import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as reviewActions from "../../store/review";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "./DeleteReview";

const ReviewDetailsPage = () => {
  const { orderId, reviewId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const divRef = useRef();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(reviewActions.loadReviewByIdThunk(orderId));
  }, [dispatch, orderId]);

  const currentReview = useSelector((state) => state.reviews[reviewId]);
  const isLoading = !currentReview && !showModal;

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!showModal) return;

    const closeMenu = (e) => {
      if (!divRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showModal]);

  return (
    <div className="container">
      <div className="review-details-container">
        {!isLoading && !currentReview && <div>Review not found.</div>}
        {!isLoading && currentReview && (
          <div>
            <p className="review-text">{currentReview?.review}</p>
            <p className="stars">Stars: {currentReview?.stars}</p>
            {user.isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/reviews/edit/${orderId}/${reviewId}`);
                }}
              >
                Edit Review
              </button>
            )}
            <div className="button-container">
              <OpenModalButton
                modalComponent={<DeleteReview orderId={orderId} reviewId={reviewId} />}
                buttonText="Delete"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetailsPage;
