import { v4 as uuidv4 } from "uuid";

const columns = ["open", "planned", "in-progress", "done"];

const items = [
  {
    id: uuidv4(),
    title: "Task #1",
    description: "Description task #1",
    status: "done",
    priority: "P0",
  },
  {
    id: uuidv4(),
    title: "Task #2",
    description: "Description task #2",
    status: "open",
    priority: "P1",
  },
  {
    id: uuidv4(),
    title: "Task #3",
    description: "Description task #3",
    status: "planned",
    priority: "P5",
  },
  {
    id: uuidv4(),
    title: "Task #4",
    description: "Description task #4",
    status: "planned",
    priority: "P1",
  },
  {
    id: uuidv4(),
    title: "Task #5",
    description: "Description task #5",
    status: "in-progress",
    priority: "P4",
  },
  {
    id: uuidv4(),
    title: "Task #6",
    description: "Description task #6",
    status: "in-progress",
    priority: "P2",
  },
  {
    id: uuidv4(),
    title: "Task #7",
    description: "Description task #7",
    status: "planned",
    priority: "P3",
  },
  {
    id: uuidv4(),
    title: "Task #8",
    description: "Description task #8",
    status: "done",
    priority: "P0",
  },
  {
    id: uuidv4(),
    title: "Task #9",
    description: "Description task #9",
    status: "done",
    priority: "P1",
  },
];

function fetchColumns() {
  return JSON.stringify(columns);
}

function fetchItems() {
  return JSON.stringify(items);
}

export { fetchColumns, fetchItems };
