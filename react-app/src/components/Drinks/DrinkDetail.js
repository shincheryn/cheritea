import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as drinkActions from "../../store/drink";
import OpenModalButton from "../OpenModalButton";
import DeleteDrink from "./DeleteDrink";
import "../CSS/AllDetails.css";

const DrinkDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(drinkActions.loadDrinkByIdThunk(id));
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
            {user?.isAdmin && (
              <div className="button-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/drinks/${id}/edit`);
                  }}
                >
                  Edit Drink
                </button>
              </div>
            )}
            {user?.isAdmin && (
              <div className="button-container">
                <OpenModalButton
                  modalComponent={<DeleteDrink drinkId={currentDrink.id} />}
                  buttonText="Delete"
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
