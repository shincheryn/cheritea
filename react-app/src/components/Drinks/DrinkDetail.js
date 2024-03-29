import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as drinkActions from "../../store/drink";
import * as reviewActions from "../../store/review";
import OpenModalButton from "../OpenModalButton";
import DeleteDrink from "./DeleteDrink";
import "../CSS/AllDetails.css";

const DrinkDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();
  const reviews = useSelector((state) =>
    Object.values(state.reviews).filter(
      (review) => review?.drinkId === parseInt(id)
    )
  );

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(drinkActions.loadDrinkByIdThunk(id));
    dispatch(reviewActions.loadReviewByDrinkIdThunk(id));
  }, [dispatch, id]);

  const currentDrink = useSelector((state) => state.drinks[id]);
  const isLoading = !currentDrink && !showModal;

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!showModal) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showModal]);

  return (
    <div className="item-page-container">
      <div className="item-container">
        {!isLoading && !currentDrink && <div>Drink not found.</div>}
        {!isLoading && currentDrink && (
          <div>
            <h1 className="item-name">{currentDrink?.name}</h1>
            <img
              className="item-image"
              key={currentDrink?.id}
              src={currentDrink?.imageUrl}
              alt={currentDrink?.name}
              title={currentDrink?.name}
            />
            <p className="details">{currentDrink?.details}</p>

            {/* Reviews */}
            <div className="item-page-container">
              {Object.values(reviews).map((review) => (
                <div key={review?.id} className="review">
                  <p className="review-text"> Reviews:{review?.review}</p>
                  <p className="stars">Stars: {review?.stars}</p>
                </div>
              ))}
            </div>

            {user?.isAdmin && (
              <div className="button-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/drinks/${id}/edit`);
                  }}
                >
                  edit drink
                </button>
              </div>
            )}
            {user?.isAdmin && (
              <div className="button-container">
                <OpenModalButton
                  modalComponent={<DeleteDrink drinkId={currentDrink.id} />}
                  buttonText="delete drink"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinkDetailsPage;
