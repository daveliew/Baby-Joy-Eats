import React, { createContext, useReducer } from "react";
import Header from "../pages/Header";
import Main from "../pages/Main";
import initialData, { ingredients } from "../data/initialData";

export const DataContext = createContext();

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ACTIONS = {
  ADD_FAVE: "addFave",
  ADD_INGREDIENT: "addIngredient",
  UPDATE_INGREDIENTS: "updateIngredients",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_FAVE:
      return console.log("added");
    case ACTIONS.UPDATE_INGREDIENTS:
      return {
        ...state,
        ingredientsData: action.payload,
      };
    case ACTIONS.ADD_INGREDIENT:
      console.log("new ingredient!", action.payload);

      return {
        ...state,
        ingredientsData: {
          ...state.columns,
          columns: {
            ...state.columns.main,
            main: {
              itemsArr: [action.payload, ...state.columns.main.itemsArr],
            },
          },
        },
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    ingredientsArr: ingredients,
    ingredientsData: {
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
    },
  });

  const value = { state, dispatch, ACTIONS };

  return (
    <div className="App">
      <DataContext.Provider value={value}>
        <Header />
        <Main />
      </DataContext.Provider>
    </div>
  );
}

export default App;
