import React, { useEffect, useState, useContext, useRef } from "react";
import { DataContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const IngredientAjax = () => {
  const inputRef = useRef();
  const [ingredient, setIngredient] = useState({ id: "", content: "" });
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([]);

  const value = useContext(DataContext);
  const { dispatch, ACTIONS } = value;

  const sendIngredient = () => {
    setToggle(!toggle);
    console.log("sending ingredient", tags);
    // dispatch({
    //   type: ACTIONS.ADD_INGREDIENT,
    //   payload: { id: uuidv4(), content: query },
    // });
  };
  const handleTags = (event, values) => {
    setTags(values);
    setIngredient(values);
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

  const handleClick = (e) => {
    console.log("handleclick", e.target.value);
    console.log(inputRef.current);

    setIngredient({
      ...ingredient,
      content: inputRef.current,
    });
  };

  //! rewrite this such that we search on form submit
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

  //   return <div>Hello from Ajax</div>;
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
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === 13 && e.target.value) {
                  setIngredient(e.target.value);
                  console.log(e.target.value, "return key");
                }
              }}
              onChange={handleChange}
              //   value={ingredient.content}
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
