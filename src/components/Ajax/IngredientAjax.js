import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  IconButton,
  Container,
  Grid,
  Button,
} from "@material-ui/core/";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddBox } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    flexGrow: 1,
    marginTop: "2vh",
    backgroundColor: "#E9C46A",
  },
  grid: {
    flexGrow: 1,
  },
  addBox: {
    justifyContent: "center",
    marginTop: "1.5rem",
    marginLeft: "1rem",
  },
  delBtn: {
    marginTop: "-3rem",
    marginBottom: "1rem",
  },
}));

const capitalizeWords = (words) => {
  let result = words
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return result;
};

const IngredientAjax = () => {
  const classes = useStyles();

  const value = useContext(DataContext);
  const { dispatch, ACTIONS } = value;

  const [ingredient, setIngredient] = useState([]); // capture user selection
  const [data, setData] = useState([]); // return API call
  const [query, setQuery] = useState(""); //for URL
  const [tags, setTags] = useState([]); // for autocomplete

  const handleSubmit = () => {
    if (tags.length > 1) {
      dispatch({
        type: ACTIONS.ADD_INGREDIENT,
        payload: { id: uuidv4(), content: capitalizeWords(tags) },
      });
      setTags([]);
      setIngredient([]);
    }
  };

  const handleTags = (event, values) => {
    setTags(values);
    setIngredient(tags);
  };

  const handleChange = (event, values) => {
    const value = event.target.value;

    setQuery(value);
    setIngredient({
      ...ingredient,
      content: value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      document.getElementById("addBox").click();
    }
  };

  useEffect(() => {
    const autoComplete =
      "https://api.spoonacular.com/food/ingredients/autocomplete";
    const API_ROOT = autoComplete;
    const queryItem = query;
    const URL = `${API_ROOT}?query=${queryItem}&apiKey=${process.env.REACT_APP_SPOONACULAR}`;

    fetch(URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Bad Response from Server");
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [query]);

  return (
    <div className={classes.autocomplete}>
      <Container>
        <Grid container direction="row" alignItems="flex-start">
          <Grid item xs={3}>
            <Autocomplete
              id="free-solo"
              style={{ width: 300 }}
              freeSolo
              disableClearable
              onInputChange={(e) => {
                setIngredient(e.target.value);
              }}
              onChange={handleTags}
              options={data.map((option) => option.name)}
              onKeyPress={handleKeyPress}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="filled-primary"
                  label="Add an ingredient"
                  margin="normal"
                  variant="outlined"
                  value={ingredient.content}
                  InputProps={{ ...params.InputProps, type: "search" }}
                  onChange={handleChange}
                  placeholder="e.g. banana"
                />
              )}
            />
          </Grid>
          <Grid item xs={3} sm={1} alignContent="center">
            <IconButton
              id="addBox"
              onClick={handleSubmit}
              className={classes.addBox}
            >
              <AddBox />
            </IconButton>
          </Grid>
          <Grid container className={classes.delBtn} justify="flex-end">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => dispatch({ type: ACTIONS.CLEAR_PLANNER })}
            >
              Clear Items
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default IngredientAjax;
