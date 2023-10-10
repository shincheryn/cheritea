import React from "react";
import { Link } from "react-router-dom";
import LandingPageImage from "./LandingPageImage.jpg";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="header">
        <h1 className="headline">
          Welcome to Cheritea, your communitea boba shop!
        </h1>
        <p className="subheadline">
          Explore our delightful selection of unique milk tea flavors and toppings
        </p>
        <Link to="/drinks" className="cta-button">
          View Our Drinks
        </Link>
      </div>

      <div className="image-container">
        <img
          src={LandingPageImage}
          alt="Landing Page Image"
          className="landing-image"
        />
      </div>

      <div className="about">
        <p>
          Cheritea is dedicated to providing you with the best boba experience.
          Along with our special twists to traditional Asian flavors,
          we use premium ingredients and craft each drink with love and care for our
          cherished customers.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
