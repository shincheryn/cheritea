import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as drinkActions from "../../store/drink";

function DeleteDrink({ drinkId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmButtonHandler = async (e) => {
    e.preventDefault();
    await dispatch(drinkActions.deleteDrinkThunk(drinkId));
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <h5>Are you sure you want to delete this drink?</h5>
      <button className="deleteDrinkButton" onClick={confirmButtonHandler}>
        Yes (Delete Drink)
      </button>
      <button className="deleteDrinkButton" onClick={closeModal}>
        No (Keep Drink)
      </button>
    </div>
  );
}

export default DeleteDrink;