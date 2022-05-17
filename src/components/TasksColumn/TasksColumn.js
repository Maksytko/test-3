import { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import update from "immutability-helper";
import { getCards, getTaskForAdd } from "../../redux/selectors";
import TaskCard from "../TaskCard/TaskCard";
import {
  changeCurrentModalColumn,
  changeModalStatus,
} from "../../redux/actions";
import style from "./TasksColumn.module.css";

function TasksColumn({ title, changeTaskForDelete, taskForDelete }) {
  const dispatch = useDispatch();
  const allCards = useSelector(getCards);
  const taskForAdd = useSelector(getTaskForAdd);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      if (item.status !== title) {
        setCards((prevState) => [...prevState, { ...item, status: title }]);
        changeTaskForDelete(item);
      }
    },
    hover: (item) => setSelectedCard(item),
  }));

  useEffect(() => {
    if (allCards.length > 0) {
      setCards(allCards.filter((card) => card.status === title));
    }
  }, [allCards, title]);

  useEffect(() => {
    if (taskForDelete?.status === title) {
      setCards((prevState) =>
        prevState.filter((task) => taskForDelete.id !== task.id)
      );
    }
  }, [taskForDelete?.id, taskForDelete?.status, title]);

  useEffect(() => {
    if (taskForAdd?.status === title) {
      setCards((prevState) => [...prevState, taskForAdd]);
    }
  }, [taskForAdd, title]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setCards((prevCards) => {
        if (prevCards.find((card) => card.id === selectedCard.id)) {
          return update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex]],
            ],
          });
        } else {
          return prevCards;
        }
      });
    },
    [selectedCard]
  );

  return (
    <div ref={drop} className={style.column}>
      <p className={style.title}>{title}</p>
      <button
        onClick={() => {
          dispatch(changeModalStatus());
          dispatch(changeCurrentModalColumn(title));
        }}
        className={style.button}
        type="button"
      >
        Click to add task
      </button>
      <ul className={style.list}>
        {cards?.map((card, i) => (
          <TaskCard
            id={card.id}
            title={card.title}
            description={card.description}
            status={card.status}
            priority={card.priority}
            index={i}
            moveCard={moveCard}
            key={card.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default TasksColumn;
