import React, { createContext, useReducer } from "react";
import Header from "../pages/Header";
import Main from "../pages/Main";
import initialData from "../data/initialData";
import { ThemeProvider } from "@material-ui/styles";
import useStyles from "../styles/styles";

import { Grid, Container, CssBaseline, IconButton } from "@material-ui/core";

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
      Object.entries(state.dndColumns)
        .filter((arr) => arr[0] !== "main")
        .forEach((col) => (col[1].itemsArr = []));
      console.log("all gone now!");

      return {
        ...state,
      };

    case ACTIONS.EDIT_INGREDIENT:
      const { content, id, colId } = action.payload;
      // console.log("FROM PAYLOAD", content, id, colId);

      let tempArr = state.dndColumns[colId].itemsArr;
      // console.log("tempArr", tempArr);
      var result = tempArr.filter((obj) => obj.id === id);
      // console.log("fetched", result);
      result[0].content = content;
      console.log(result);

      return {
        ...state,
        activeItem: { id: id, content: content },
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
    activeItem: { id: "", content: "pear" },
  });
  const value = { state, dispatch, ACTIONS };

  console.log(state.activeItem);

  return (
    <ThemeProvider theme={useStyles.theme}>
      <CssBaseline />
      <div className="App">
        <DataContext.Provider value={value}>
          <Grid
            container
            maxWidth="md"
            justify="center"
            style={{ marginTop: 50 }}
            className={classes.container}
          >
            <Grid item>
              <Header />
            </Grid>
            <Grid item>
              <Main />
            </Grid>
          </Grid>
        </DataContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
