import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import CreateOrderModal from "../Orders/CreateOrder";
import OpenModalButton from "../OpenModalButton";
import "./Navigation.css";
import CartPageModal from "../Orders/CartPage";
import shoppingCart from "./shopping-cartt.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/drinks" className="nav-link">
            Drinks
          </NavLink>
        </li>
        <li>
          <NavLink to="/toppings" className="nav-link">
            Toppings
          </NavLink>
        </li>
        {sessionUser && (
          <>
            <li>
              <OpenModalButton
                buttonText="Start an Order"
                modalComponent={<CreateOrderModal />}
              />
            </li>
            <li>
              <NavLink to="/orders" className="nav-link">
                My Orders
              </NavLink>
            </li>
            <li>
              <OpenModalButton
                buttonText={
                  <span>
                    <img src={shoppingCart} alt="Shopping Cart" />
                  </span>
                }
                modalComponent={<CartPageModal />}
              />
            </li>
          </>
        )}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
