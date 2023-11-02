// My Orders Page (with details and reviews)
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as orderActions from "../../store/order";
import * as cartActions from "../../store/cart";
import OpenModalButton from "../OpenModalButton";
import DeleteOrder from "./DeleteOrder";
import "../CSS/AllItems.css";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector((state) => Object.values(state.orders));
  const user = useSelector((state) => state.session.user);
  const [orderDetails, setOrderDetails] = useState("");

  useEffect(() => {
    dispatch(orderActions.loadOrdersByUserIdThunk(user.id));
  }, [dispatch, user.id]);
  

  return (
    <div>
      <div className="page-container">
        <h1 className="title">My Orders</h1>
        <div className="tile-container">
          {order && order.length > 0 ? (
            order.map((order) => (
              <div key={order.id} className="standard-tile">
                <Link to={`/orders/${order.id}`} className="link">
                  <div>
                    <p>Order Number: {order.id}</p>
                    <p>Drink: {order.order_drink.name}</p>
                    {order.toppings.map((topping, index) => (
                      <p>
                        Topping {index + 1}: {topping.name}
                      </p>
                    ))}
                    <div className="button-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          history.push(`/orders/${user}/edit`);
                        }}
                      >
                        Edit Order
                      </button>
                    </div>
                    <div className="button-container">
                      <OpenModalButton
                        modalComponent={<DeleteOrder orderId={order.id} />}
                        buttonText="Delete"
                      />
                    </div>
                  </div>
                </Link>
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
