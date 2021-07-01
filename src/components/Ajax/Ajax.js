import React, { useState, useEffect } from "react";

const API_ROOT = `https://api.spoonacular.com/`;
const findByIngredients = "recipes/findByIngredients?ingredients=";
const queryItem = "banana";
const URL = `${API_ROOT}${findByIngredients}${queryItem}&apiKey=${process.env.REACT_APP_SPOONACULAR}`;

const Ajax = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
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
    // }, [data]);

    return data === null ? (
      <h1>LOADING</h1>
    ) : (
      <>
        <h1>{data.title}</h1>
        <p>Likes: {data.likes}</p>
        <img src={data.image} alt={data.title}></img>
      </>
    );
  });
};

export default Ajax;
