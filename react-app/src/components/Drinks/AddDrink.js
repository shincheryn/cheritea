import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as drinkActions from "../../store/drink";
import "../CSS/CreateForm.css";

const AddDrinkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const defaultDrinkImage = "https://res.cloudinary.com/dvlsr70pm/image/upload/v1696373139/4207310_a3m63u.png";
  const [drinkName, setDrinkName] = useState("");
  const [drinkDetails, setDrinkDetails] = useState("");
  const [drinkImageUrl, setDrinkImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Drink Name: If empty, throw error
    if (drinkName.trim() === "") {
      setError("Please add a drink name");
      return;
    }
    // Drink Details: If empty, throw error
    if (drinkDetails.trim() === "") {
      setError("Please add drink details");
      return;
    }

    // Drink Image: If empty, make it defaultDrinkImage
    const imageUrlToUse =
      drinkImageUrl.trim() === "" ? defaultDrinkImage : drinkImageUrl;

    await dispatch(
      drinkActions.addDrinkThunk({
        name: drinkName,
        details: drinkDetails,
        imageUrl: imageUrlToUse,
      })
    );
    history.push("/drinks/");
  };

  return (
    <div className="form-container">
      <div className="centered-content">
        <h1 className="form-title">Create a Drink</h1>
        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="form-label">
              Drink Name
              <input
                className="form-input"
                type="text"
                placeholder="Drink Name"
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
              />
            </label>
            <label className="form-label">
              Drink Details
              <input
                className="form-input"
                type="text"
                placeholder="Drink Details"
                value={drinkDetails}
                onChange={(e) => setDrinkDetails(e.target.value)}
              />
            </label>
            <label className="form-label">
              Drink Image Url
              <input
                className="form-input"
                type="text"
                placeholder="Drink Image URL"
                value={drinkImageUrl}
                onChange={(e) => setDrinkImageUrl(e.target.value)}
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

export default AddDrinkPage;
