import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import CreateOrderModal from "../Orders/CreateOrderModal";
import "./Navigation.css";

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
              <button onClick={CreateOrderModal}>Start an Order</button>
            </li>
            <li>
              <NavLink to="/orders" className="nav-link">
                My Orders
              </NavLink>
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
