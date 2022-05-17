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
  const [priority, setPriority] = useState("P0");
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

    if (event.currentTarget.name === "priority") {
      setPriority(event.currentTarget.value);
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
        priority,
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
        <form onSubmit={handleFormSubmit} className={style.form}>
          <label className={style.label}>
            <span className={style.text}>Title</span>
            <input
              required
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              className={style.input}
            ></input>
          </label>
          <label className={style.label}>
            <span className={style.text}>Description</span>
            <textarea
              required
              type="text"
              name="description"
              value={description}
              onChange={handleInputChange}
              className={style.textarea}
            ></textarea>
          </label>
          <label className={style.label}>
            <span className={style.text}>Priority</span>
            <select
              className={style.select}
              name="priority"
              onChange={handleInputChange}
            >
              <option value="P0">0</option>
              <option value="P1">1</option>
              <option value="P2">2</option>
              <option value="P3">3</option>
              <option value="P4">4</option>
              <option value="P5">5</option>
            </select>
          </label>
          <button type="submit" className={style.button}>
            Create task
          </button>
        </form>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
