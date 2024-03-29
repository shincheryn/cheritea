import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as toppingActions from "../../store/topping";
import "../CSS/CreateForm.css";

const AddToppingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const defaultToppingImage = "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696815460/topping-default-image.png";
  const [toppingName, setToppingName] = useState("");
  const [toppingDetails, setToppingDetails] = useState("");
  const [toppingImageUrl, setToppingImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Topping Name: If empty, throw error
    if (toppingName.trim() === "") {
      setError("Please add a topping name");
      return;
    }
    // Topping Details: If empty, throw error
    if (toppingDetails.trim() === "") {
      setError("Please add topping details");
      return;
    }

    // if (toppingName) {
    //   setError("Topping already exists");
    //   return;
    // }

    // Topping Image: If empty, make it defaultToppingImage
    const imageUrlToUse =
      toppingImageUrl.trim() === "" ? defaultToppingImage : toppingImageUrl;

    await dispatch(
      toppingActions.addToppingThunk({
        name: toppingName,
        details: toppingDetails,
        imageUrl: imageUrlToUse
      })
    );
    history.push("/toppings/");
  };

  return (
    <div className="form-container">
      <div className="centered-content">
        <h1 className="form-title">Create a Topping</h1>
        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="form-label">
              Topping Name
              <input
                className="form-input"
                type="text"
                placeholder="Topping Name"
                value={toppingName}
                onChange={(e) => setToppingName(e.target.value)}
              />
            </label>
            <label className="form-label">
              Topping Details
              <input
                className="form-input"
                type="text"
                placeholder="Topping Details"
                value={toppingDetails}
                onChange={(e) => setToppingDetails(e.target.value)}
              />
            </label>
            <label className="form-label">
              Topping Image Url
              <input
                className="form-input"
                type="text"
                placeholder="Topping Image URL"
                value={toppingImageUrl}
                onChange={(e) => setToppingImageUrl(e.target.value)}
              />
            </label>
            {error && <p className="form-error-message">{error}</p>}
          </div>
          <button className="form-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToppingPage;
