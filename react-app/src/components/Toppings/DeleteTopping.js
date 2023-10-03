import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as toppingActions from "../../store/topping";

function DeleteTopping({ toppingId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmButtonHandler = async (e) => {
    e.preventDefault();
    await dispatch(toppingActions.deleteToppingThunk(toppingId));
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h5>Are you sure you want to delete this topping?</h5>
      <button className="deleteToppingButton" onClick={confirmButtonHandler}>
        Yes (Delete Topping)
      </button>
      <button className="deleteToppingButton" onClick={closeModal}>
        No (Keep Topping)
      </button>
    </div>
  );
}

export default DeleteTopping;
