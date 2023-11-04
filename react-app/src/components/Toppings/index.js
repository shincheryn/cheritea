import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as toppingsActions from "../../store/topping";
import "../CSS/AllItems.css";

const AllToppingsPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toppings = useSelector((state) => Object.values(state.toppings));
  const user = useSelector((state) => state.session.user);
  const inModal = props.inModal;
  const onToppingSelected = props.onToppingSelected;
  const selectedToppingIds = props.selectedToppingIds;

  useEffect(() => {
    dispatch(toppingsActions.loadAllToppingsThunk());
  }, [dispatch]);

  const handleItemClick = (toppingId) => {
    if (inModal && onToppingSelected) {
      if (
        selectedToppingIds.includes(toppingId) ||
        selectedToppingIds.length < 3
      ) {
        onToppingSelected(toppingId);
      } else {
        alert("You can only select up to 3 toppings.");
      }
    } else if (!inModal) {
      history.push(`/toppings/${toppingId}`);
    }
  };

  return (
    <div>
      <div className="page-container">
        <h1 className="title">Toppings</h1>
        {user?.isAdmin &&
          !inModal &&
          (toppings.length === 0 ? (
            <div className="create-button-container">
              <button
                className="standard-button"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/toppings`);
                }}
              >
                Create Your First Topping
              </button>
            </div>
          ) : (
            <div className="create-button-container">
              <button
                className="standard-button"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/toppings/new`);
                }}
              >
                add a new topping
              </button>
            </div>
          ))}

        <div className={`tile-container${inModal ? " inModal" : ""}`}>
          {/* if user isAdmin */}
          {toppings.map((topping) => (
            <div
              key={topping.id}
              onClick={() => handleItemClick(topping.id)}
              style={{ cursor: inModal ? "pointer" : "default" }}
              className={`standard-tile ${
                selectedToppingIds && selectedToppingIds.includes(topping.id)
                  ? "selected"
                  : ""
              }`}
            >
              <img
                className="image"
                src={topping.imageUrl}
                alt={topping.name}
                title={topping.name}
              />
              <div className="name">{topping.name}</div>
              <div className="button-container"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllToppingsPage;
