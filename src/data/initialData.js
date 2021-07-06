import { v4 as uuidv4 } from "uuid";
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const ingredients = [
  { id: uuidv4(), content: "Fish" },
  { id: uuidv4(), content: "Avocado" },
  { id: uuidv4(), content: "Lemon" },
  { id: uuidv4(), content: "Strawberry" },
  { id: uuidv4(), content: "Blueberry" },
  { id: uuidv4(), content: "Quinoa" },
  { id: uuidv4(), content: "Grape" },
];

// const objectMap = (obj, fn) => {
//   let k, v;
//   Object.fromEntries(Object.entries(obj).map([k, v], (i) => [k, fn(v, k, i)]));
// };

const initialData = {
  columns: {
    main: {
      id: "main",
      title: "My List",
      itemsArr: ingredients,
    },
    Mon: {
      id: daysOfWeek[0],
      title: daysOfWeek[0],
      itemsArr: [],
    },
    Tue: {
      id: daysOfWeek[1],
      title: daysOfWeek[1],
      itemsArr: [],
    },
    Wed: {
      id: daysOfWeek[2],
      title: daysOfWeek[2],
      itemsArr: [],
    },
    Thu: {
      id: daysOfWeek[3],
      title: daysOfWeek[3],
      itemsArr: [],
    },
    Fri: {
      id: daysOfWeek[4],
      title: daysOfWeek[4],
      itemsArr: [],
    },
    Sat: {
      id: daysOfWeek[5],
      title: daysOfWeek[5],
      itemsArr: [],
    },
    Sun: {
      id: daysOfWeek[6],
      title: daysOfWeek[6],
      itemsArr: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: [
    "main",
    daysOfWeek[0],
    daysOfWeek[1],
    daysOfWeek[2],
    daysOfWeek[3],
    daysOfWeek[4],
    daysOfWeek[5],
    daysOfWeek[6],
  ],
};

export default initialData;
