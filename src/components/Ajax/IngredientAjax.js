import React, { useEffect, useState } from "react";

const IngredientAjax = () => {
  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    console.log("click");
    setToggle(!toggle);
  };

  //! rewrite this such that we search on form submit
  useEffect(() => {
    const autoComplete =
      "https://api.spoonacular.com/food/ingredients/autocomplete";
    const API_ROOT = autoComplete;
    const queryItem = "apple";
    const URL = `${API_ROOT}${queryItem}&apiKey=${process.env.REACT_APP_SPOONACULAR}`;
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
  }, []);

  //   return <div>Hello from Ajax</div>;

  return data === null ? (
    <>
      <h1>Hello from Fetch</h1>
      <button onClick={handleToggle}> Add Ingredient </button>
    </>
  ) : (
    <>
      <button onClick={handleToggle}> Add Ingredient </button>
      {/* <h1>{data.title}</h1>
      <p>Likes: {data.likes}</p> */}
    </>
  );
};

export default IngredientAjax;
