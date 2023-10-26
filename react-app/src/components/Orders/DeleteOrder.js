import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as orderActions from "../../store/order";
import "../CSS/DeleteForm.css";

function DeleteOrder({ orderId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const confirmButtonHandler = async () => {
    await dispatch(orderActions.deleteOrderThunk(orderId));
    closeModal();
    history.push("/");
  };

  return (
    <div className="delete-form-container">
      <h1 className="delete-form-title">Confirm Delete</h1>
      <h5 className="delete-form-message">
        Are you sure you want to delete this order?
      </h5>
      <button className="delete-button" onClick={confirmButtonHandler}>
        Yes (Delete Order)
      </button>
      <button className="cancel-button" onClick={closeModal}>
        No (Keep Order)
      </button>
    </div>
  );
}

export default DeleteOrder;
