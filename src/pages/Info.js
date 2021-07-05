import React from "react";
import dataReturn from "../data/dataReturnById";
// import Ajax from "../components/Ajax/Ajax";

// const instructions = dataReturn.analyzedInstructions[0].steps[0].step;

// console.log(dataReturn.analyzedInstructions[0].steps);

const instructionsArr = dataReturn.analyzedInstructions[0].steps;
let instructionSteps = instructionsArr.map((step, index) => {
  return (
    <div key={index}>
      <span>
        {index + 1}) {instructionsArr[index].step}
      </span>
      <img src={instructionsArr[index].ingredients.image} alt=""></img>
    </div>
  );
});

// const generateRow = (arr) => {
//   let images = arr.map((image, index) => {
//     return <img src={arr[index].image} alt="" key="index"></img>;
//   });
//   return images;
// };

// let instructionIngredients = instructionsArr.map((step, index) => {
//   return (
//     <div key={index}>
//       <span>
//         {index + 1}) {instructionsArr[index].step}
//       </span>
//       {generateRow(instructionsArr[index].ingredients)}
//     </div>
//   );
// });

const Info = () => {
  return (
    <>
      <div className="info-card">
        <h1>{dataReturn.title}</h1>
        <img src={dataReturn.image} alt={dataReturn.title}></img>
        <h3>Cooking Instructions</h3>
        <div>{instructionSteps}</div>
      </div>
      <div>
        <h1>Get another recipe?</h1>
      </div>
    </>
  );
};

export default Info;
