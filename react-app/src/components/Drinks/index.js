import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as drinksActions from "../../store/drink";
import "../CSS/AllItems.css";

const AllDrinksPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const drinks = useSelector((state) => Object.values(state.drinks));
  const user = useSelector((state) => state.session.user);
  const inModal = props.inModal;
  const onDrinkSelected = props.onDrinkSelected;
  const selectedDrinkId = props.selectedDrinkId;

  useEffect(() => {
    dispatch(drinksActions.loadAllDrinksThunk());
  }, [dispatch]);

  const handleItemClick = (drinkId) => {
    if (inModal && onDrinkSelected) {
      onDrinkSelected(drinkId);
    } else if (!inModal) {
      history.push(`/drinks/${drinkId}`);
    }
  };

  return (
    <div>
      <div className="page-container">
        <h1 className="title">Drinks</h1>
        {user?.isAdmin &&
          !inModal &&
          (drinks.length === 0 ? (
            <div className="create-button-container">
              <button
                className="standard-button"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/drinks`);
                }}
              >
                Create Your First Drink
              </button>
            </div>
          ) : (
            <div className="create-button-container">
              <button
                className="standard-button"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/drinks/new`);
                }}
              >
                add a new drink
              </button>
            </div>
          ))}
        <div className={`tile-container${inModal ? " inModal" : ""}`}>
          {/* if user isAdmin */}
          {drinks.map((drink) => (
            <div
              onClick={() => handleItemClick(drink.id)}
              style={{ cursor: inModal ? "pointer" : "default" }}
              key={drink.id}
              className={`standard-tile ${
                drink.id == selectedDrinkId ? "selected" : ""
              }`}
            >
              <div>
                <img
                  className="image"
                  src={drink.imageUrl}
                  alt={drink.name}
                  title={drink.name}
                />
              </div>
              <div className="name">{drink.name}</div>
              <div className="button-container"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDrinksPage;
