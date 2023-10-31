import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as drinkActions from "../../store/drink";
import * as cartActions from "../../store/cart";
import AllDrinksPage from "../Drinks";
import AllToppingsPage from "../Toppings";
import "./CreateOrder.css";

function CreateOrderModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedDrinkId, setSelectedDrinkId] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [error, setError] = useState("");
  const { closeModal } = useModal();

  const handleSelectDrink = async (drinkId) => {
    setSelectedDrinkId(drinkId);
  };

  const handleSelectTopping = async (toppingId) => {
    if (!selectedToppings.includes(toppingId)) {
      setSelectedToppings([...selectedToppings, toppingId]);
    } else {
      setSelectedToppings([
        ...selectedToppings.filter((id) => {
          return id != toppingId;
        }),
      ]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDrinkId) {
      setError("Please select a drink");
      return;
    }

    if (selectedToppings.length > 3) {
      setError("Please select a maximum of three toppings");
      return;
    }

    await dispatch(
      cartActions.addCartItem({
        drinkId: selectedDrinkId,
        toppingIds: selectedToppings,
      })
    );
    closeModal();
    history.push("/");
  };

  return (
    <div className="create-order-modal">
      <h3>Create Your Order</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Select a Drink:</label>
          <div className="select-item">
            <AllDrinksPage
              inModal={true}
              onDrinkSelected={handleSelectDrink}
              selectedDrinkId={selectedDrinkId}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Select Toppings (choose up to 3):</label>
          <div className="select-item">
            <AllToppingsPage
              inModal={true}
              onToppingSelected={handleSelectTopping}
              selectedToppingIds={selectedToppings}
            />
          </div>
        </div>

        <button type="submit" className="primary-button">
          Add to Cart
        </button>
        <button type="button" onClick={closeModal} className="secondary-button">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateOrderModal;
