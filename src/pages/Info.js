import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core/";

import dataReturn from "../data/dataReturnById";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    marginTop: "2vh",
    alignItems: "center",
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
}));

//

const Info = () => {
  const classes = useStyles();
  // const [dataReturn, setDataReturn] = useState(state.activeRecipe);

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

  return (
    <Container className={classes.root}>
      {/* <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <h1>{dataReturn.title}</h1>
              <img src={dataReturn.image} alt={dataReturn.title}></img>
              <h3>Cooking Instructions</h3>
              <Typography variant="body2" color="textSecondary" component="p">
                {instructionSteps}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </Container>
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
