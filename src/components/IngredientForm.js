import React, { useState, useContext } from "react";
import { DataContext } from "./App";
import { v4 as uuidv4 } from "uuid";

const IngredientForm = () => {
  const value = useContext(DataContext);
  const { dispatch, ACTIONS } = value;
  const [ingredient, setIngredient] = useState({ id: "", content: "" });

  const handleSubmit = () => {
    console.log("handleSubmit");
    setIngredient({ id: "", content: "" });
    console.log(ingredient);
    dispatch({
      type: ACTIONS.ADD_INGREDIENT,
      payload: { ...ingredient, id: uuidv4() },
    });
  };

  const handleChange = (event) => {
    // const name = event.target.name;
    const value = event.target.value;

    // console.log("handleChange - event", event.target.computedName);
    console.log("handleChange - value", event.target.value);
    setIngredient({
      ...ingredient,
      content: value,
    });
  };

  return (
    <>
      <input
        onChange={handleChange}
        value={ingredient.content}
        type="text"
        className="form-control"
        name="name"
        placeholder="Add an ingredient"
      />
      <button
        className="btn btn-lg btn-primary btn-block"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
};

export default IngredientForm;
