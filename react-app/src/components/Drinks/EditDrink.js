import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as drinkActions from "../../store/drink";

const EditDrinkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const drink = useSelector((state) => state.drinks[id]);
  const [drinkName, setDrinkName] = useState(drink?.name || "");
  const [drinkDetails, setDrinkDetails] = useState(drink?.details || "");
  const [drinkImage, setDrinkImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!drink) {
      dispatch(drinkActions.loadDrinkByIdThunk(id))
        .then((drink) => {
          if (drink) {
            setDrinkName(drink.name);
            setDrinkDetails(drink.details);
          }
        })
        .catch((err) => {
          console.error("Error fetching drink details:", err);
        });
    }
  }, [dispatch, id, drink]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData Object
    const formData = new FormData();
    formData.append("name", drinkName);
    formData.append("details", drinkDetails);
    if (drinkImage) {
      formData.append("image", drinkImage);
    }

    if (!drinkName) setErrors({ drinkName: "Drink name is required" });
    else if (!drinkDetails)
      setErrors({ drinkDetails: "Drink detail is required" });
    else {
      setErrors({});
      dispatch(drinkActions.editDrinkThunk(id, formData))
        .then((drink) => {
          console.log(drink);
          history.push(`/drinks/${id}/`);
        })
        .catch((err) => {
          console.error("Error editing drink:", err);
        });
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="form-create">
          <h1>Update Drink</h1>
          <form
            method="PUT"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <div className="error-message">
                {errors.drinkName && <p className="">{errors.drinkName}</p>}
              </div>
              <label className="label-create">
                Drink Name
                <input
                  className="input-create"
                  type="text"
                  name="drink-name"
                  placeholder="Drink Name"
                  value={drinkName}
                  onChange={(e) => setDrinkName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <div className="error-message">
                {errors.drinkDetails && (
                  <p className="">{errors.drinkDetails}</p>
                )}
              </div>
              <label className="label-create">
                Drink Details
                <input
                  type="text"
                  name="drink-details"
                  placeholder="Drink Details"
                  value={drinkDetails}
                  onChange={(e) => setDrinkDetails(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="label-create">
                Drink Image
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => setDrinkImage(e.target.files[0])}
                />
              </label>
              {drink?.imageUrl && (
                <img src={drink.imageUrl} alt="Current Drink Image" />
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDrinkPage;
