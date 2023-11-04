import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as toppingActions from "../../store/topping";
import "../CSS/EditForm.css";

const EditToppingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const topping = useSelector((state) => state.toppings[id]);
  const [toppingName, setToppingName] = useState(topping?.name || "");
  const [toppingDetails, setToppingDetails] = useState(topping?.details || "");
  const [toppingImage, setToppingImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!topping) {
      dispatch(toppingActions.loadToppingByIdThunk(id))
        .then((topping) => {
          if (topping) {
            setToppingName(topping.name);
            setToppingDetails(topping.details);
          }
        })
        .catch((err) => {
          console.error("Error fetching topping details:", err);
        });
    }
  }, [dispatch, id, topping]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData Object
    const formData = new FormData();
    formData.append("name", toppingName);
    formData.append("details", toppingDetails);
    if (toppingImage) {
      formData.append("image", toppingImage);
    }

    if (!toppingName) setErrors({ toppingName: "Topping name is required" });
    else if (!toppingDetails)
      setErrors({ toppingDetails: "Topping detail is required" });
    else {
      setErrors({});
      dispatch(toppingActions.editToppingThunk(id, formData))
        .then((topping) => {
          console.log(topping);
          history.push(`/toppings/${id}/`);
        })
        .catch((err) => {
          console.error("Error editing topping:", err);
        });
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="form-create">
          <h1>Update Topping</h1>
          <form
            method="PUT"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <div className="error-message">
                {errors.toppingName && <p className="">{errors.toppingName}</p>}
              </div>
              <label className="label-create">
                Topping Name
                <input
                  className="input-create"
                  type="text"
                  name="topping-name"
                  placeholder="Topping Name"
                  value={toppingName}
                  onChange={(e) => setToppingName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <div className="error-message">
                {errors.toppingDetails && (
                  <p className="">{errors.toppingDetails}</p>
                )}
              </div>
              <label className="label-create">
                Topping Details
                <input className="input-create"
                  type="text"
                  name="topping-details"
                  placeholder="Topping Details"
                  value={toppingDetails}
                  onChange={(e) => setToppingDetails(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="label-create">
                Topping Image
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => setToppingImage(e.target.files[0])}
                />
              </label>
              {topping?.imageUrl && (
                <img src={topping.imageUrl} alt="Current Topping" />
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditToppingPage;
