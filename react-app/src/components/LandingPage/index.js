import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className="headline">
        welcome to cheritea, your communitea boba shop!
      </h1>

      <div className="header"></div>

      <div className="about"></div>

      <div className="menu"></div>
    </div>
  );
}

export default LandingPage;
