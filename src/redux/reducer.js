import { combineReducers, createReducer } from "@reduxjs/toolkit";
import {
  changeCurrentModalColumn,
  changeModalStatus,
  changeTaskForAdd,
  setCards,
  setColumns,
} from "./actions";

const initState = {
  columns: [],
  cards: [],
  modalStatus: false,
  currentModalColumn: null,
  taskForAdd: null,
};

const columnsReducer = createReducer(initState.columns, {
  [setColumns]: (_, { payload }) => payload,
});

const cardsReducer = createReducer(initState.cards, {
  [setCards]: (_, { payload }) => payload,
});

const modalStatusReducer = createReducer(initState.modalStatus, {
  [changeModalStatus]: (state) => !state,
});

const currentModalColumnReducer = createReducer(initState.currentModalColumn, {
  [changeCurrentModalColumn]: (_, { payload }) => payload,
});

const taskForAddReducer = createReducer(initState.taskForAdd, {
  [changeTaskForAdd]: (_, { payload }) => payload,
});

const reducer = combineReducers({
  columns: columnsReducer,
  cards: cardsReducer,
  modalStatus: modalStatusReducer,
  currentModalColumn: currentModalColumnReducer,
  taskForAdd: taskForAddReducer,
});

export default reducer;
