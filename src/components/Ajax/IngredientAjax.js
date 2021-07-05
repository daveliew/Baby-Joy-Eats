import React, { useEffect, useContext, useState } from "react";
// import { DataContext } from "./App";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const Autocomplete = styled.div`
  display: relative;
`;

const IngredientAjax = () => {
  //   const value = useContext(DataContext);
  //   const { dispatch, ACTIONS } = value;
  const [ingredient, setIngredient] = useState({ id: "", content: "" });
  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState("");

  const handleToggle = () => {
    console.log("click");
    setToggle(!toggle);
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
    //!add a dispatch
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
        // setData(data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [query]);

  //   return <div>Hello from Ajax</div>;
  return (
    <>
      <Autocomplete>
        <form>
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
          <button onClick={handleToggle}> Fetch Ingredient </button>
        </form>
      </Autocomplete>
    </>
  );

  //   return data === null ? (
  //     <>
  //       <h1>Hello from Fetch</h1>
  //       <button onClick={handleToggle}> Add Ingredient </button>
  //     </>
  //   ) : (
  //     <>
  //     <h1></h1>
  //       <button onClick={handleToggle}> Add Ingredient </button>
  //       {/* <h1>{data.title}</h1>
  //       <p>Likes: {data.likes}</p> */}
  //     </>
  //   );
};

export default IngredientAjax;
