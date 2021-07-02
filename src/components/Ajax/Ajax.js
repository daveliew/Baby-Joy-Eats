import React, { useEffect } from "react";

const Ajax = () => {
  // const [data, setData] = useState(null);
  // const [toggle, setToggle] = useState(false);

  // const handleToggle = () => {
  //   console.log("click");
  //   setToggle(!toggle);
  // };

  //! rewrite this such that we search on form submit
  useEffect(() => {
    const API_ROOT = `https://api.spoonacular.com/`;
    const findByIngredients = "findByIngredients?ingredients=";
    const complexSearch = "complexSearch";
    const categories = [findByIngredients, complexSearch];
    const queryItem = "apple";
    const URL = `${API_ROOT}recipes/${categories[0]}${queryItem}&apiKey=${process.env.REACT_APP_SPOONACULAR}`;
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
  }, []);

  return <div>Hello from Ajax</div>;

  // return data === null ? (
  //   <h1>LOADING</h1>
  // ) : (
  //   <>
  //     <button onClick={handleToggle}> New Recipe </button>
  //     <h1>{data.title}</h1>
  //     <p>Likes: {data.likes}</p>
  //   </>
  // );
};

export default Ajax;
