import React, { useEffect, useState, useContext } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import { DataContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import ComboBox from "./Test";

const IngredientAjax = () => {
  const [ingredient, setIngredient] = useState({ id: "", content: "" });
  const [data, setData] = useState([{ test: "test" }]);
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState([{ test: "test" }]);
  //   const [suggestions, setSuggestions] = useState([]);

  const value = useContext(DataContext);
  const { dispatch, ACTIONS } = value;

  const handleToggle = () => {
    console.log("query", query);
    setToggle(!toggle);
    dispatch({
      type: ACTIONS.ADD_INGREDIENT,
      payload: { id: uuidv4(), content: query },
    });
  };

  const handleChange = (event) => {
    // const name = event.target.name;
    // console.log("handleChange - event", event.target.computedName);

    const value = event.target.value;
    console.log("handleChange - value", event.target.value);

    setQuery(value);
    setIngredient({
      ...ingredient,
      content: value,
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
      <input
        onChange={handleChange}
        value={ingredient.content}
        options={data}
        type="text"
        className="form-control"
        name="name"
        placeholder="Add an ingredient"
        autoComplete="off"
      />

      <button onClick={handleToggle}> Add to Ingredient List </button>
      <ComboBox value={data} />
    </>
  );
};

export default IngredientAjax;
