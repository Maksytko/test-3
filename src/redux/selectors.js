const getColumns = (store) => store.columns;

const getCards = (store) => store.cards;

const getModalStatus = (store) => store.modalStatus;

const getCurrentModalColumn = (store) => store.currentModalColumn;

const getTaskForAdd = (store) => store.taskForAdd;

export {
  getColumns,
  getCards,
  getModalStatus,
  getCurrentModalColumn,
  getTaskForAdd,
};
