import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as toppingActions from "../../store/topping";

const AddToppingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const defaultToppingImage = "";
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

    // Topping Image: If empty, make it defaultToppingImage
    const imageUrlToUse =
      toppingImageUrl.trim() === "" ? defaultToppingImage : toppingImageUrl;

    await dispatch(
      toppingActions.addToppingThunk(toppingName, toppingDetails, imageUrlToUse)
    );
    history.push("/toppings/");
  };

  return (
    <div className="create-topping-container">
      <div className="centered-content">
        <h1 className="create-topping-title">Create a Topping</h1>
        <form
          className="create-topping-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label className="create-topping-label">
              Topping Name
              <input
                className="create-topping-input"
                type="text"
                placeholder="Topping Name"
                value={toppingName}
                onChange={(e) => setToppingName(e.target.value)}
              />
            </label>
            <label className="create-topping-label">
              Topping Details
              <input
                className="create-topping-input"
                type="text"
                placeholder="Topping Details"
                value={toppingDetails}
                onChange={(e) => setToppingDetails(e.target.value)}
              />
            </label>
            <label className="create-topping-label">
              Topping Image Url
              <input
                className="create-topping-input"
                type="text"
                placeholder="Topping Image URL"
                value={toppingImageUrl}
                onChange={(e) => setToppingImageUrl(e.target.value)}
              />
            </label>
            {error && <p className="create-topping-error-message">{error}</p>}
          </div>
          <button className="create-topping-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToppingPage;
