import { v4 as uuidv4 } from "uuid";
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// const objectMap = (obj, fn) => {
//   let k, v;
//   Object.fromEntries(Object.entries(obj).map([k, v], (i) => [k, fn(v, k, i)]));
// };

const ingredients = [
  { id: uuidv4(), content: "Fish" },
  { id: uuidv4(), content: "Avocado" },
  { id: uuidv4(), content: "Lemon" },
  { id: uuidv4(), content: "Strawberry" },
  { id: uuidv4(), content: "Blueberry" },
  { id: uuidv4(), content: "Quinoa" },
  { id: uuidv4(), content: "Grape" },
];

const initialData = {
  columns: {
    main: {
      id: "main",
      title: "My List",
      itemsArr: ingredients,
    },
    "column-2": {
      id: "column-2",
      title: daysOfWeek[0],
      itemsArr: [],
    },
    "column-3": {
      id: "column-3",
      title: daysOfWeek[1],
      itemsArr: [],
    },
    "column-4": {
      id: "column-4",
      title: daysOfWeek[2],
      itemsArr: [],
    },
    "column-5": {
      id: "column-5",
      title: daysOfWeek[3],
      itemsArr: [],
    },
    "column-6": {
      id: "column-6",
      title: daysOfWeek[4],
      itemsArr: [],
    },
    "column-7": {
      id: "column-7",
      title: daysOfWeek[5],
      itemsArr: [],
    },
    "column-8": {
      id: "column-8",
      title: daysOfWeek[6],
      itemsArr: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: [
    "main",
    "column-2",
    "column-3",
    "column-4",
    "column-5",
    "column-6",
    "column-7",
    "column-8",
  ],
};

export default initialData;

// const initialData = {
//   items: {
//     "item-1": { id: "item-1", content: "Fish" },
//     "item-2": { id: "item-2", content: "Avocado" },
//     "item-3": { id: "item-3", content: "Lemon" },
//     "item-4": { id: "item-4", content: "Strawberry" },
//     "item-5": { id: "item-5", content: "Blueberry" },
//     "item-6": { id: "item-6", content: "Quinoa" },
//     "item-7": { id: "item-7", content: "Grape" },
//     "item-8": { id: "item-8", content: "Fish" },
//   },
//   columns: {
//     main: {
//       id: "main",
//       title: "My List",
//       itemsArr: ["item-1", "item-2", "item-3", "item-4", "item-5"],
//     },
//     "column-2": {
//       id: "column-2",
//       title: daysOfWeek[0],
//       itemsArr: ["item-6", "item-7"],
//     },
//     "column-3": {
//       id: "column-3",
//       title: daysOfWeek[1],
//       itemsArr: [],
//     },
//     "column-4": {
//       id: "column-4",
//       title: daysOfWeek[2],
//       itemsArr: [],
//     },
//     "column-5": {
//       id: "column-5",
//       title: daysOfWeek[3],
//       itemsArr: [],
//     },
//     "column-6": {
//       id: "column-6",
//       title: daysOfWeek[4],
//       itemsArr: [],
//     },
//     "column-7": {
//       id: "column-7",
//       title: daysOfWeek[5],
//       itemsArr: [],
//     },
//     "column-8": {
//       id: "column-8",
//       title: daysOfWeek[6],
//       itemsArr: [],
//     },
//   },
//   // Facilitate reordering of the columns
//   columnOrder: [
//     "main",
//     "column-2",
//     "column-3",
//     "column-4",
//     "column-5",
//     "column-6",
//     "column-7",
//     "column-8",
//   ],
// };

// export default initialData;
