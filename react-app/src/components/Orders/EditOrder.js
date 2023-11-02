import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as orderActions from "../../store/order";
import * as drinkActions from "../../store/drink"; 
import "../CSS/EditForm.css";

const EditOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const order = useSelector((state) => state.orders[id]);
  const [drinkId, setDrinkId] = useState(order?.drinkId || "");
  const [toppingIds, setToppingIds] = useState(
    order?.toppings.map((t) => t.id) || []
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!order) {
      dispatch(orderActions.loadOrderByIdThunk(id))
        .then((order) => {
          if (order) {
            setDrinkId(order.drinkId);
            setToppingIds(order.toppings.map((t) => t.id));
          }
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
        });
    }
  }, [dispatch, id, order]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      drinkId: drinkId,
      toppingIds: toppingIds,
    };

    if (!drinkId) {
      setErrors({ drinkId: "Drink is required" });
    } else if (!toppingIds.length) {
      setErrors({ toppingIds: "At least one topping is required" });
    } else {
      setErrors({});

      dispatch(editOrderThunk(id, updatedOrder))
        .then((order) => {
          console.log(order);
          history.push(`/orders/${id}/`);
        })
        .catch((err) => {
          console.error("Error editing order:", err);
        });
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="form-create">
          <h1>Update Order</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="error-message">
                {errors.drinkId && <p className="">{errors.drinkId}</p>}
              </div>
              <label className="label-create">
                Select a Drink
                <select
                  className="input-create"
                  value={drinkId}
                  onChange={(e) => setDrinkId(e.target.value)}
                >
                  <option value="">Select a Drink</option>
                </select>
              </label>
            </div>
            <div>
              <div className="error-message">
                {errors.toppingIds && <p className="">{errors.toppingIds}</p>}
              </div>
              <label className="label-create">
                Select Toppings
                <select
                  className="input-create"
                  multiple
                  value={toppingIds}
                  onChange={(e) =>
                    setToppingIds(
                      [...e.target.selectedOptions].map(
                        (option) => option.value
                      )
                    )
                  }
                ></select>
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditOrderPage;
