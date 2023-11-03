import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as orderActions from "../../store/order";
import * as cartActions from "../../store/cart";
import AllDrinksPage from "../Drinks";
import AllToppingsPage from "../Toppings";
import "./CreateOrder.css";

function CreateOrderModal(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedDrinkId, setSelectedDrinkId] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [error, setError] = useState("");
  const { closeModal } = useModal();
  const orderId = props.orderId;

  useEffect(() => {
    if (orderId !== undefined) {
      dispatch(orderActions.loadOrderByIdThunk(orderId))
        .then((order) => {
          if (order) {
            setSelectedDrinkId(order.drinkId);
            setSelectedToppings(order.toppings.map((t) => t.id));
          }
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
        });
    }
  }, [dispatch, orderId]);

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

    // if (selectedToppings.length > 3) {
    //   setError("Please select a maximum of three toppings");
    //   return;
    // }
    if (orderId === undefined) {
      await dispatch(
        cartActions.addCartItem({
          drinkId: selectedDrinkId,
          toppingIds: selectedToppings,
        })
      );
      closeModal();
      history.push("/");
    } else {
      await dispatch(
        orderActions.editOrderThunk(orderId, {
          drinkId: selectedDrinkId,
          toppingIds: selectedToppings,
        })
      );
      closeModal();
    }
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
          {orderId === undefined ? "Add to Cart" : "Update Order"}
        </button>
        <button type="button" onClick={closeModal} className="secondary-button">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateOrderModal;
