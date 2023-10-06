import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as drinkActions from "../../store/drink";
import "../CSS/DeleteForm.css";

function DeleteDrink({ drinkId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const confirmButtonHandler = async () => {
    await dispatch(drinkActions.deleteDrinkThunk(drinkId));
    closeModal();
    history.push("/drinks/");
  };

  return (
    <div className="delete-form-container">
      <h1 className="delete-form-title">Confirm Delete</h1>
      <h5 className="delete-form-message">
        Are you sure you want to delete this drink?
      </h5>
      <button className="delete-button" onClick={confirmButtonHandler}>
        Yes (Delete Drink)
      </button>
      <button className="cancel-button" onClick={closeModal}>
        No (Keep Drink)
      </button>
    </div>
  );
}

export default DeleteDrink;
