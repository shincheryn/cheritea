// My Orders Page (with details and reviews)
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as orderActions from "../../store/order";
import "../CSS/AllItems.css";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => Object.values(state.orders));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(orderActions.loadOrdersByUserIdThunk(user.id));
  }, [dispatch, user.id]);

  return (
    <div>
      <div className="page-container">
        <h1 className="title">My Orders</h1>
        <div className="tile-container">
          {orders.map((order) => (
            <div key={order.id} className="standard-tile">
              <Link to={`/orders/${user.userId}`} className="link">
                <div>
                  <p>Order Date: {order.orderDate}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
