import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/cart";
import * as drinkActions from "../../store/drink";
import * as toppingActions from "../../store/topping";
import * as orderActions from "../../store/order";
import "./CartPage.css";
import CreateOrderModal from "./CreateOrder";

const CartPageModal = () => {
  const cart = useSelector((state) => state.cart);
  const drinks = useSelector((state) => state.drinks);
  const toppings = useSelector((state) => state.toppings);
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent, closeModal } = useModal();

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

  const addOrderHandler = () => {
    setModalContent(<CreateOrderModal></CreateOrderModal>);
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
    // const storedCart = localStorage.getItem("cart");
    // if(cart !== storedCart){
    //   var mergedCart = merge(storedCart, cart, (a, b) => a.order == b.order)
    //   setState(state => ({ ...state, cart: storedCart }));
    // }
    cart.forEach((orderRecord) => {
      loadDrink(orderRecord.order);
      loadToppings(orderRecord.order);
    });
    // localStorage.setItem("cart", cart);
  }, [dispatch, cart]);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="order-list">
          {cart.map((orderRecord, index) => (
            <div className="cart-container" key={index}>
              <div className="order-header">
                <h3>Order # {index + 1}</h3>
                <h3>Quantity : {orderRecord.quantity}</h3>
              </div>
              {/* Order's drink.name based on selected drinkId */}
              <p>{drinks[orderRecord.order.drinkId]?.name}</p>
              <h5>
                {orderRecord.order.toppingIds.length > 0
                  ? "with :"
                  : "No Toppings"}
              </h5>
              {/* Order's topping.name based on selected toppingIds */}
              <ul>
                {orderRecord.order.toppingIds.map((toppingId) => (
                  <li>{toppings[toppingId]?.name}</li>
                ))}
              </ul>
              <div>
                <button onClick={removeOrderHandler(index)}>
                  remove order
                </button>
                <button onClick={increaseQuantityHandler(index)}>+ 1</button>
                <button onClick={decreaseQuantityHandler(index)}>- 1</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isCartEmpty ? null : (
        <button onClick={submitOrderHandler}>submit</button>
      )}
      <button onClick={addOrderHandler}>
        {isCartEmpty ? "start an" : "add another"} order
      </button>
    </div>
  );
};

export default CartPageModal;
