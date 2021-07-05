import React, { createContext, useReducer } from "react";
import Header from "../pages/Header";
import Main from "../pages/Main";
import initialData, { ingredients } from "../data/initialData";

export const DataContext = createContext();

const ACTIONS = {
  ADD_FAVE: "addFave",
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_FAVE:
      return console.log("added");
    case ACTIONS.UPDATE_INGREDIENTS:
      return {
        ...state,
        ingredientsData: action.payload,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(recipeReducer, {
    ingredientsArr: ingredients,
    ingredientsData: initialData,
  });

  console.log(initialData);

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
