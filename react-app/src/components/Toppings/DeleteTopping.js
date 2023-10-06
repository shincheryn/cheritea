import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as toppingActions from "../../store/topping";
import "../CSS/DeleteForm.css";

function DeleteTopping({ toppingId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const confirmButtonHandler = async (e) => {
    e.preventDefault();
    await dispatch(toppingActions.deleteToppingThunk(toppingId));
    closeModal();
    history.push("/toppings/")
  };

  return (
    <div className="delete-form-container">
      <h1 className="delete-form-title">Confirm Delete</h1>
      <h5 className="delete-form-message">
        Are you sure you want to delete this topping?
      </h5>
      <button className="delete-button" onClick={confirmButtonHandler}>
        Yes (Delete Topping)
      </button>
      <button className="cancel-button" onClick={closeModal}>
        No (Keep Topping)
      </button>
    </div>
  );
}

export default DeleteTopping;
