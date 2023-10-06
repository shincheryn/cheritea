import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as toppingsActions from "../../store/topping";
import "./Toppings.css";

const AllToppingsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toppings = useSelector((state) => Object.values(state.toppings));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(toppingsActions.loadAllToppingsThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="page-container">
        <h1 className="title">Toppings</h1>
        {user.isAdmin &&
          (toppings.length === 0 ? (
            <div className="create-first-topping">
              <button
                className="upload-button"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/toppings`);
                }}
              >
                Create Your First Topping
              </button>
            </div>
          ) : (
            <div className="topping-button">
              <button
                className="upload-button"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/toppings/new`);
                }}
              >
                Add a New Topping
              </button>
            </div>
          ))}
        <div className="tile-container">
          {/* if user isAdmin */}
          {toppings.map((topping) => (
            <div key={topping.id} className="tile">
              <Link to={`/toppings/${topping.id}`} className="topping-link">
                <div>
                  <img
                    className="image"
                    src={topping.imageUrl}
                    alt={topping.name}
                    title={topping.name}
                  />
                </div>
                <div className="topping-name">{topping.name}</div>
              </Link>
              <div className="button-container"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllToppingsPage;
