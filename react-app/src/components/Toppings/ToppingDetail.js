import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as toppingActions from "../../store/topping";
import OpenModalButton from "../OpenModalButton";
import DeleteTopping from "./DeleteTopping";

const ToppingDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(toppingActions.loadToppingByIdThunk(id));
  }, [dispatch, id]);

  const currentTopping = useSelector((state) => state.toppings[id]);
  const isLoading = !currentTopping && !showModal;

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!showModal) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showModal]);

  return (
    <div className="item-page-container">
      <div className="item-container">
        {!isLoading && !currentTopping && <div>Topping not found.</div>}
        {!isLoading && currentTopping && (
          <div>
            <h1 className="item-name">{currentTopping?.name}</h1>
            <img
              className="item-image"
              key={currentTopping?.id}
              src={currentTopping?.imageUrl}
              alt={currentTopping?.name}
              title={currentTopping?.name}
            />
            <p className="details">{currentTopping?.details}</p>
            {user?.isAdmin && (
              <div className="button-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/toppings/${id}/edit`);
                  }}
                >
                  Edit Topping
                </button>
              </div>
            )}
            {user?.isAdmin && (
              <div className="button-container">
                <OpenModalButton
                  modalComponent={
                    <DeleteTopping toppingId={currentTopping.id} />
                  }
                  buttonText="Delete"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToppingDetailsPage;
