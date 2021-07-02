import React from "react";
import dataReturn from "../data/dataReturnById";

const instructions = dataReturn.analyzedInstructions[0].steps[0].step;

console.log(dataReturn.analyzedInstructions[0].steps);

const instructionsArr = dataReturn.analyzedInstructions[0].steps;
let instructionSteps = instructionsArr.map((step, index) => {
  return (
    <div>
      {index + 1}) {instructionsArr[index].step}
    </div>
  );
});

const Info = () => {
  return (
    <div className="info-card">
      <h1>{dataReturn.title}</h1>
      <img src={dataReturn.image} alt={dataReturn.title}></img>
      <div>{instructionSteps}</div>
    </div>
  );
};

export default Info;
