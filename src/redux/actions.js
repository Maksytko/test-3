import { createAction } from "@reduxjs/toolkit";

const setColumns = createAction("columns/set");

const setCards = createAction("cards/set");

const changeModalStatus = createAction("modalStatus/change");

const changeCurrentModalColumn = createAction("currentModalColumn/change");

const changeTaskForAdd = createAction("taskForAdd/change");

export {
  setColumns,
  setCards,
  changeModalStatus,
  changeCurrentModalColumn,
  changeTaskForAdd,
};
