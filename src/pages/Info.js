import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core/";
import { red } from "@material-ui/core/colors";

import dataReturn from "../data/dataReturnById";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50vw",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

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

const Info = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <h1>{dataReturn.title}</h1>
        <img src={dataReturn.image} alt={dataReturn.title}></img>
        <h3>Cooking Instructions</h3>
        <Typography variant="body2" color="textSecondary" component="p">
          {instructionSteps}
        </Typography>

        <hr />
        <button>Get another recipe?</button>
      </CardContent>
    </Card>
  );
};
export default Info;

// // const generateRow = (arr) => {
// //   let images = arr.map((image, index) => {
// //     return <img src={arr[index].image} alt="" key="index"></img>;
// //   });
// //   return images;
// // };

// // let instructionIngredients = instructionsArr.map((step, index) => {
// //   return (
// //     <div key={index}>
// //       <span>
// //         {index + 1}) {instructionsArr[index].step}
// //       </span>
// //       {generateRow(instructionsArr[index].ingredients)}
// //     </div>
// //   );
// // });
