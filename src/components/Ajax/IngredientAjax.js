import React, { useEffect, useContext, useState } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";

const IngredientAjax = () => {
  //   const value = useContext(DataContext);
  //   const { dispatch, ACTIONS } = value;
  const [ingredient, setIngredient] = useState({ id: "", content: "" });
  const [data, setData] = useState([{ test: "test" }]);
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

    //     fetch(URL)
    //       .then((res) => {
    //         if (res.ok) {
    //           return res.json();
    //         }
    //         throw new Error("Bad Response from Server");
    //       })
    //       .then((data) => {
    //         console.log(data);
    //         setData(data);
    //       })
    //       .catch((error) => {
    //         console.log("error");
    //       });
  }, [query]);

  //   return <div>Hello from Ajax</div>;
  return (
    <>
      {/* <input
          onChange={handleChange}
          value={ingredient.content}
          options={data}
          type="text"
          className="form-control"
          name="name"
          placeholder="Add an ingredient"
          autoComplete="off"
        /> */}
      <button onClick={handleToggle}> Fetch Ingredient </button>
      {/* <Autosuggest
        inputProps={{
          placeholder: "Add ingredient",
          autoComplete: "abcd",
          name: "food",
          id: "food",
          onChange: { handleChange },
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={async ({ value }) => {
          if (!value) {
            setSuggestions([]);
            return;
          }
          try {
            const result = await axios.get(
              `https://api.spoonacular.com/food/ingredients/autocomplete?query=${value}&apiKey=${process.env.REACT_APP_SPOONACULAR}`
            );
            setSuggestions(result);
            console.log(result.data);
          } catch (e) {
            setSuggestions([]);
            console.log(e);
          }
        }}
        getSuggestionValue={(suggestion) => suggestions.name}
        renderSuggestion={(suggestion) => <div>{suggestions.name}</div>}
      /> */}
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
