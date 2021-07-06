import React, { createContext, useReducer } from "react";
import Header from "../pages/Header";
import Main from "../pages/Main";
import initialData, { ingredients } from "../data/initialData";

export const DataContext = createContext();

const ACTIONS = {
  ADD_INGREDIENT: "addIngredient",
  UPDATE_INGREDIENTS: "updateIngredients",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_INGREDIENTS:
      return {
        ...state,
        dndData: action.payload,
      };
    case ACTIONS.ADD_INGREDIENT:
      console.log("new ingredient!", action.payload);

      return {
        ...state,
        ingredientsArr: action.payload.concat(state.ingredientsArr),
      };
    // return {
    //   ...state,
    //   dndData: {
    //     ...state.columns,
    //     columns: {
    //       ...state.columns.main,
    //       main: {
    //         itemsArr: [action.payload, ...state.columns.main.itemsArr],
    //       },
    //     },
    //   },
    // };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    ingredientsArr: ingredients,
    dndData: initialData,
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
