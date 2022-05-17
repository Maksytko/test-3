import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumns, fetchItems } from "../../api/api";
import { setCards, setColumns } from "../../redux/actions";
import { getColumns, getModalStatus } from "../../redux/selectors";
import Modal from "../Modal/Modal";
import TasksColumn from "../TasksColumn/TasksColumn";
import style from "./TasksBoardSection.module.css";

function TasksBoardSection() {
  const dispatch = useDispatch();
  const columns = useSelector(getColumns);
  const modalStatus = useSelector(getModalStatus);
  const [taskForDelete, setTaskForDelete] = useState(null);

  function changeTaskForDelete(task) {
    setTaskForDelete(task);
  }

  useEffect(() => {
    const columns = JSON.parse(fetchColumns());
    const cards = JSON.parse(fetchItems());
    dispatch(setColumns(columns));
    dispatch(setCards(cards));
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={style.section}>
        {columns.map((column) => (
          <TasksColumn
            title={column}
            changeTaskForDelete={changeTaskForDelete}
            taskForDelete={taskForDelete}
            key={column}
          />
        ))}
      </section>
      {modalStatus && <Modal />}
    </DndProvider>
  );
}

export default TasksBoardSection;
