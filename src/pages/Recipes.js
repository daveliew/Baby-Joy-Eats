import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../components/App";
import RecipeCards from "../components/Cards/RecipeCards";

const Recipes = (props) => {
  const value = useContext(DataContext);
  const { state } = value;
  const [data, setData] = useState(null);

  // setData(props.data);
  // const imgUrl = `https://spoonacular.com/cdn/ingredients_100x100/${queryItem}.jpg`;
  // console.log(imgUrl);

  // const queryItem = state.activeItem.content.replace(/\s/g, "").toLowerCase();
  const queryItem = state.activeItem.content.toLowerCase(); //take ingredient from state to search in recipes.
  console.log(`Searching for < ${queryItem} > in recipes component`);

  useEffect(() => {
    const API_ROOT = `https://api.spoonacular.com/`;
    const findByIngredients = "recipes/findByIngredients?ingredients=";
    const complexSearch = "recipes/complexSearch";
    const ingredients = "food/ingredients/search";
    const numRecipes = 10;
    const categories = [ingredients, findByIngredients, complexSearch];
    const URL = `${API_ROOT}${categories[1]}${queryItem}&number=${numRecipes}&apiKey=${process.env.REACT_APP_SPOONACULAR}`;

    fetch(URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Bad Response from Server");
      })
      .then((data) => {
        console.log("got back some data", data);
        setData(data);
      })
      .catch((error) => {
        console.log("error from recipes");
      });
  }, [queryItem]);

  // return <h1>loading</h1>;
  return data === null ? <h1>LOADING</h1> : <RecipeCards data={data} />;
};

export default Recipes;
