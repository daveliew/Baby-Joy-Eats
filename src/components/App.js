import React, { createContext, useReducer } from "react";
import Header from "../pages/Header";
import Main from "../pages/Main";
import initialData from "../data/initialData";
import { makeStyles } from "@material-ui/styles";

import { Grid, Container, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#f4a261",
    maxHeight: "100vh",
    padding: "0.5rem",
  },
}));

export const DataContext = createContext();

const ACTIONS = {
  ADD_INGREDIENT: "addIngredient",
  CLEAR_PLANNER: "clearPlanner",
  EDIT_INGREDIENT: "editIngredient",
  REORDER_ARR: "reorderArr",
  UPDATE_COLS: "updateCols",
  SELECT_PAGE: "selectPage",
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
      Object.entries(state.dndColumns)
        .filter((arr) => arr[0] !== "main")
        .forEach((col) => (col[1].itemsArr = []));
      console.log("all gone now!");

      return {
        ...state,
      };

    case ACTIONS.EDIT_INGREDIENT:
      console.log("editing ingredient");
      const { content, id, colId } = action.payload;
      const tempArr = state.dndColumns[colId].itemsArr; // make a copy of column's item array
      var result = tempArr.filter((obj) => obj.id === id); // sift out id that matches obj id within array
      result[0].content = content; // replace with the new content
      console.log(result);

      return {
        ...state,
        activeItem: { id: id, content: content },
      };

    case ACTIONS.SELECT_PAGE:
      console.log("page set:", action.payload);
      return {
        ...state,
        activePage: action.payload,
      };

    default:
      return state;
  }
};

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(appReducer, {
    ingredientsArr: initialData.ingredients,
    dndColumns: initialData.columns,
    dndColOrder: initialData.colOrder,
    activeItem: { id: "", content: "avocado" },
    activePage: "/",
  });
  const value = { state, dispatch, ACTIONS };

  console.log(state.activeItem);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Container>
          <DataContext.Provider value={value}>
            <Grid
              container
              maxWidth="md"
              justify="center"
              style={{ marginTop: 50 }}
              className={classes.container}
            >
              <Header />
              <Main />
            </Grid>
          </DataContext.Provider>
        </Container>
      </div>
    </>
  );
};

export default App;
