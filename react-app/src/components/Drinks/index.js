import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as drinksActions from "../../store/drink";
import OpenModalButton from "../OpenModalButton";
import "./Drinks.css";

const AllDrinks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const drinks = useSelector((state) => Object.values(state.drinks));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(drinksActions.loadAllDrinksThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="page-container">
        <h1 className="title">Drinks</h1>
        {user.isAdmin &&
          (drinks.length === 0 ? (
            <div className="create-first-drink">
              <button
                className="upload-button"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/drinks`);
                }}
              >
                Create Your First Drink
              </button>
            </div>
          ) : (
            <div className="drink-button">
              <button
                className="upload-button"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/drinks/new`);
                }}
              >
                Add a New Drink
              </button>
            </div>
          ))}
        <div className="tile-container">
          {/* if user isAdmin */}
          {drinks.map((drink) => (
            <div key={drink.id} className="tile">
              <Link to={`/drinks/${drink.id}`} className="drink-link">
                <div>
                  <img
                    className="image"
                    src={drink.imageUrl}
                    alt={drink.name}
                    title={drink.name}
                  />
                </div>
                <div className="drink-name">{drink.name}</div>
              </Link>
              <div className="button-container">
                {/* <OpenModalButton
                      modalComponent={<DeleteDrinkModal id={drink.id} />}
                      buttonText="Delete"
                    /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDrinks;