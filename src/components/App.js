import React, { createContext, useReducer } from "react";
import Header from "../pages/Header";
import Main from "../pages/Main";
import initialData from "../data/initialData";

export const DataContext = createContext();

const ACTIONS = {
  ADD_INGREDIENT: "addIngredient",
  CLEAR_PLANNER: "clearPlanner",
  EDIT_INGREDIENT: "editIngredient",
  REORDER_ARR: "reorderArr",
  UPDATE_COLS: "updateCols",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_COLS:
      return {
        ...state,
        dndColumns: action.payload,
        ingredientsArr: action.payload.main.itemsArr,
      };

    case ACTIONS.ADD_INGREDIENT:
      console.log("new ingredient!", action.payload);

      if (action.payload.content.length === 0) {
        console.log("nothing added");
        return state;
      } else {
        return {
          ...state,
          ingredientsArr: [action.payload, ...state.ingredientsArr],
        };
      }

    case ACTIONS.CLEAR_PLANNER:
      console.log("all gone now!");

      Object.entries(state.dndColumns)
        .filter((arr) => arr[0] !== "main")
        .forEach((col) => (col[1].itemsArr = []));
      return {
        ...state,
      };

    case ACTIONS.EDIT_INGREDIENT:
      console.log("changing item");
      //! continue to add data
      return {
        ...state,
        // ingredientsArr:
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    ingredientsArr: initialData.ingredients,
    dndColumns: initialData.columns,
    dndColOrder: initialData.colOrder,
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
