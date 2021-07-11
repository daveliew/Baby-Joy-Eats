import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../components/App";

const NutritionAjax = (props) => {
  const value = useContext(DataContext);
  const { state, dispatch, ACTIONS } = value;

  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    console.log("click");
    setToggle(!toggle);
  };

  //! rewrite this such that we search on form submit
  useEffect(() => {
    const API_ROOT = `https://api.spoonacular.com/`;
    const findByIngredients = "recipes/findByIngredients?ingredients=";
    const complexSearch = "recipes/complexSearch";
    const ingredients = "food/ingredients/search";
    const categories = [findByIngredients, complexSearch, ingredients];
    const queryItem = state.activeItem.content.replace(/\s/g, "");
    const URL = `${API_ROOT}${categories[1]}?${queryItem}&apiKey=${process.env.REACT_APP_SPOONACULAR}`;
    console.log(URL);

    //   fetch(URL)
    //     .then((res) => {
    //       if (res.ok) {
    //         return res.json();
    //       }
    //       throw new Error("Bad Response from Server");
    //     })
    //     .then((data) => {
    //       console.log(data[0]);
    //       setData(data[0]);
    //     })
    //     .catch((error) => {
    //       console.log("error");
    //     });
  }, [toggle, state.activeItem]);
  return <h1>Hello from Ajax</h1>;
  // return data === null ? (
  //   <h1>LOADING</h1>
  // ) : (
  //   <>
  //     <button onClick={handleToggle}> New Recipe </button>
  //     <p>{data}</p>
  //     {/* <h1>{data.title}</h1>
  //     <p>Likes: {data.likes}</p> */}
  //   </>
  // );
};

export default NutritionAjax;
