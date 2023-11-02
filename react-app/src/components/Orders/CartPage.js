import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/cart";
import * as drinkActions from "../../store/drink";
import * as toppingActions from "../../store/topping";
import * as orderActions from "../../store/order";
import "./CartPage.css";

const CartPageModal = () => {
  const cart = useSelector((state) => state.cart);
  const drinks = useSelector((state) => state.drinks);
  const toppings = useSelector((state) => state.toppings);
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const loadDrink = async (order) => {
    dispatch(drinkActions.loadDrinkByIdThunk(order.drinkId));
  };

  const loadToppings = async (order) => {
    order.toppingIds.forEach(async (toppingId) => {
      dispatch(toppingActions.loadToppingByIdThunk(toppingId));
    });
  };

  const increaseQuantityHandler = (cartIndex) => {
    return () => {
      dispatch(cartActions.increaseCartItemQuantity(cartIndex));
    };
  };

  const decreaseQuantityHandler = (cartIndex) => {
    return () => {
      dispatch(cartActions.decreaseCartItemQuantity(cartIndex));
    };
  };

  const removeOrderHandler = (cartIndex) => {
    return () => {
      dispatch(cartActions.removeCartItem(cartIndex));
    };
  };

  const isCartEmpty = cart.length === 0;
  const submitOrderHandler = async () => {
    await Promise.all(
      cart.map(async (orderRecord) => {
        for (var i = 0; i < orderRecord.quantity; i++) {
          await dispatch(orderActions.addOrderThunk(orderRecord.order));
        }
      })
    );
    await dispatch(cartActions.emptyCartItems());
    closeModal();
    history.push("/orders/");
  };

  useEffect(() => {
    cart.forEach((orderRecord) => {
      loadDrink(orderRecord.order);
      loadToppings(orderRecord.order);
    });
  }, [dispatch, cart]);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="order-list">
          {cart.map((orderRecord, index) => (
            <div className="order" key={index}>
              <div className="order-header">
                <h3>Order {index + 1}</h3>
                <h3>Quantity: {orderRecord.quantity}</h3>
              </div>
              {/* Order's drink.name based on selected drinkId */}
              <p>{drinks[orderRecord.order.drinkId]?.name}</p>
              <h4>
                {orderRecord.order.toppingIds.length > 0
                  ? "Toppings:"
                  : "No Toppings"}
              </h4>
              {/* Order's topping.name based on selected toppingIds */}
              <ul>
                {orderRecord.order.toppingIds.map((toppingId) => (
                  <li>{toppings[toppingId]?.name}</li>
                ))}
              </ul>
              <div>
                <button onClick={removeOrderHandler(index)}>
                  Remove Order
                </button>
                <button onClick={increaseQuantityHandler(index)}>+ 1</button>
                <button onClick={decreaseQuantityHandler(index)}>- 1</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isCartEmpty ? null : (
        <button onClick={submitOrderHandler}>Submit Order</button>
      )}
    </div>
  );
};

export default CartPageModal;
