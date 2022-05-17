import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import style from "./TaskCard.module.css";

function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  index,
  moveCard,
}) {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      title,
      description,
      status,
      priority,
      index,
    },
    type: "task",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "task",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
      data-handler-id={handlerId}
      className={style.card}
    >
      <p className={style.text}>{title}</p>
      <p className={style.text}>{description}</p>
    </li>
  );
}

export default TaskCard;
