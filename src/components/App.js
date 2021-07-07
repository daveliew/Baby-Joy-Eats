import React, { createContext, useReducer } from "react";
import Header from "../pages/Header";
import Main from "../pages/Main";
import initialData from "../data/initialData";

export const DataContext = createContext();

const ACTIONS = {
  ADD_INGREDIENT: "addIngredient",
  UPDATE_COLS: "updateCols",
  REORDER_ARR: "reorderArr",
  CLEAR_PLANNER: "clearPlanner",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_COLS:
      return { ...state, dndColumns: action.payload };
    case ACTIONS.ADD_INGREDIENT:
      console.log("new ingredient!", action.payload);
      return {
        ...state,
        // dndColumns: {
        //   ...state.dndColumns,
        //   main: {
        //     ...state.dndColumns.main,
        //     itemsArr: action.payload.concat([
        //       ...state.dndColumns.main.itemsArr,
        //     ]),
        //   },
        // },
        ingredientsArr: action.payload.concat(state.ingredientsArr),
      };
    case ACTIONS.CLEAR_PLANNER:
      console.log("all gone now!");

      return {
        ...state,
        dndData: {},
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    ingredientsArr: initialData.ingredients,
    dndColumns: initialData.columns,
    dndColOrder: initialData.columnOrder,
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
