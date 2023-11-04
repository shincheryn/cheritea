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
            home
          </NavLink>
        </li>
        <li>
          <NavLink to="/drinks" className="nav-link">
            drinks
          </NavLink>
        </li>
        <li>
          <NavLink to="/toppings" className="nav-link">
            toppings
          </NavLink>
        </li>
        {sessionUser && (
          <>
            <li>
              <OpenModalButton
                buttonText="start an order"
                modalComponent={<CreateOrderModal />}
              />
            </li>
            <li>
              <NavLink to="/orders" className="nav-link">
                my orders
              </NavLink>
            </li>
            <li>
              <OpenModalButton
                buttonText={
                  <span>
                    <img className="shopping-cart-img" src={shoppingCart} alt="Shopping Cart" />
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
