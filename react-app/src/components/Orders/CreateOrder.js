import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as drinkActions from "../../store/drink";
import * as cartActions from "../../store/cart";

function CreateOrderModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [drinks, setDrinks] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedDrinkId, setSelectedDrinkId] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [error, setError] = useState("");
  const { closeModal } = useModal();

  const handleSelectDrink = async (e) => {
    const drinkId = e.target.value;
    setSelectedDrinkId(drinkId);
    if (drinkId) {
      await dispatch(drinkActions.loadDrinkByIdThunk(drinkId));
    }
  };

  const handleSelectTopping = (e) => {
    const toppingId = e.target.value;
    if (e.target.checked) {
      setSelectedToppings([...selectedToppings, toppingId]);
    } else {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId));
    }
  };

  const handleSubmit = async (e) => {
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
    history.push("/");
  };

  return (
    <div className="create-order-modal">
      <h3>Create Your Order</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select a Drink:</label>
          <select
            onChange={handleSelectDrink}
            value={selectedDrinkId}
            className="form-control"
          >
            <option value="">Select a Drink</option>
            {drinks.map((drink) => (
              <option key={drink.id} value={drink.id}>
                {drink.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select Toppings (choose up to 3):</label>
          {toppings.map((topping) => (
            <div key={topping.id} className="form-check">
              <input
                value={topping.id}
                onChange={handleSelectTopping}
                checked={selectedToppings.includes(topping.id)}
                className="form-check-input"
              />
              <label className="form-check-label">{topping.name}</label>
            </div>
          ))}
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
