import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../components/App";
import RecipeCards from "../components/Cards/RecipeCards";

const Recipes = (props) => {
  const value = useContext(DataContext);
  const { state } = value;

  const [data, setData] = useState(null);
  console.log("data from recipes", data);
  console.log("IN RECIPES");

  setData(props.data);
  // const imgUrl = `https://spoonacular.com/cdn/ingredients_100x100/${queryItem}.jpg`;
  // console.log(imgUrl);

  useEffect(() => {
    const queryItem = state.activeItem.content.replace(/\s/g, "").toLowerCase();
    console.log(queryItem, "looking for this.");

    const API_ROOT = `https://api.spoonacular.com/`;
    const findByIngredients = "recipes/findByIngredients?ingredients=";
    const complexSearch = "recipes/complexSearch";
    const ingredients = "food/ingredients/search";
    const numRecipes = 10;
    const categories = [ingredients, findByIngredients, complexSearch];
    const URL = `${API_ROOT}${categories[1]}?${queryItem}&number=${numRecipes}&apiKey=${process.env.REACT_APP_SPOONACULAR}`;
    console.log(URL, "from recipes component");

    fetch(URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Bad Response from Server");
      })
      .then((data) => {
        console.log("got back some data", data[0]);
        setData(data[0]);
      })
      .catch((error) => {
        console.log("error from recipes");
      });

    return URL;
  }, [state.activeItem.content]);

  return data === null ? <h1>LOADING</h1> : <RecipeCards data={data} />;
};

export default Recipes;
