// My Orders Page (with details and reviews)
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as orderActions from "../../store/order";
import * as cartActions from "../../store/cart";
import OpenModalButton from "../OpenModalButton";
import DeleteOrder from "./DeleteOrder";
import "../CSS/AllItems.css";
import CreateOrderModal from "./CreateOrder";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector((state) => Object.values(state.orders));
  const user = useSelector((state) => state.session.user);
  const [time, setTime] = useState(new Date());
  const msToSec = 1000;
  const secToMin = 60;

  useEffect(() => {
    dispatch(orderActions.loadOrdersByUserIdThunk(user.id));
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, user.id]);

  return (
    <div>
      <div className="page-container">
        <h1 className="title">My Orders</h1>
        <div className="tile-container">
          {order && order.length > 0 ? (
            order.map((order) => (
              <div key={order.id} className="standard-tile">
                <div>
                  <p>Order Number: {order.id}</p>
                  <p className="order-drink-text">
                    Drink: {order.order_drink.name}
                  </p>
                  {order.toppings.map((topping, index) => (
                    <p className="order-topping-text" key={topping.id}>
                      Topping {index + 1}: {topping.name}
                    </p>
                  ))}
                  {(time - new Date(order.createdAt)) / msToSec / secToMin <
                  1 ? (
                    <div>
                      <div className="button-container">
                        <OpenModalButton
                          modalComponent={
                            <CreateOrderModal orderId={order.id} />
                          }
                          buttonText={`${
                            secToMin -
                            Math.ceil(
                              (time - new Date(order.createdAt)) / msToSec
                            )
                          } seconds to Edit`}
                        />
                      </div>
                      <div className="button-container">
                        <OpenModalButton
                          modalComponent={<DeleteOrder orderId={order.id} />}
                          buttonText={`${
                            secToMin -
                            Math.ceil(
                              (time - new Date(order.createdAt)) / msToSec
                            )
                          } seconds to Delete`}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="order-submitted-text">
                      Order has been submitted.
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No orders found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
