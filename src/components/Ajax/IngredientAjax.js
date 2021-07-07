import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const IngredientAjax = () => {
  const value = useContext(DataContext);
  const { dispatch, ACTIONS } = value;

  const [ingredient, setIngredient] = useState([]); // capture user selection
  const [data, setData] = useState([]); // return API call
  const [query, setQuery] = useState(""); //for URL
  const [tags, setTags] = useState([]); // for autocomplete

  const sendIngredient = () => {
    console.log("sending tag", tags);
    console.log("sending ingredient", ingredient);

    dispatch({
      type: ACTIONS.ADD_INGREDIENT,
      payload: { id: uuidv4(), content: tags },
    });
    setTags([]);
    setIngredient([]);
  };

  const handleTags = (event, values) => {
    setTags(values);
    setIngredient(tags);
    console.log("handleTag", values);
  };

  const handleChange = (event, values) => {
    const value = event.target.value;
    console.log("handleChange - value", event.target.value);

    setQuery(value);
    setIngredient({
      ...ingredient,
      content: value,
    });
  };

  useEffect(() => {
    const autoComplete =
      "https://api.spoonacular.com/food/ingredients/autocomplete";
    const API_ROOT = autoComplete;
    const queryItem = query;
    const URL = `${API_ROOT}?query=${queryItem}&apiKey=${process.env.REACT_APP_SPOONACULAR}`;
    console.log(URL);

    fetch(URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Bad Response from Server");
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [query]);

  return (
    <>
      <div>
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
      </div>
      <button onClick={sendIngredient}> Add to Ingredient List </button>
    </>
  );
};

export default IngredientAjax;
