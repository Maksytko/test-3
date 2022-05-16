import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { changeTaskForAdd, changeModalStatus } from "../../redux/actions";
import style from "./Modal.module.css";
import { getCurrentModalColumn } from "../../redux/selectors";

const modalRoot = document.getElementById("modal-root");

function Modal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const currentColumn = useSelector(getCurrentModalColumn);

  const handleKeydown = useCallback(
    (event) => {
      if (event.code === "Escape") {
        dispatch(changeModalStatus());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      dispatch(changeModalStatus());
    }
  }

  function handleInputChange(event) {
    if (event.currentTarget.name === "title") {
      setTitle(event.currentTarget.value);
      return;
    }

    if (event.currentTarget.name === "description") {
      setDescription(event.currentTarget.value);
      return;
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    dispatch(
      changeTaskForAdd({
        id: uuidv4(),
        title,
        description,
        status: currentColumn,
      })
    );
    dispatch(changeModalStatus());
  }

  return createPortal(
    <div onClick={handleBackdropClick} className={style.Overlay}>
      <div className={style.Modal}>
        <button onClick={handleBackdropClick} className={style.exit_button}>
          X
        </button>
        <form onSubmit={handleFormSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
            ></input>
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleInputChange}
            ></input>
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
