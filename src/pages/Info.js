import React, { useContext, useEffect, useState } from "react";
import Interweave from "interweave";
import { DataContext } from "../components/App";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
} from "@material-ui/core/";

// import dataReturn from "../data/dataReturnById";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: "100vw",
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

const Info = () => {
    const classes = useStyles();
    const value = useContext(DataContext);
    const { state } = value;
    const [data, setData] = useState(null);

    const recipeQuery = state.activeRecipe;
    console.log(`commencing search on < ${recipeQuery}> from info component`);

    useEffect(() => {
        //https://api.spoonacular.com/recipes/{id}/information
        const API_ROOT = `https://api.spoonacular.com/`;
        const URL = `${API_ROOT}/recipes/${recipeQuery}/information?apiKey=${process.env.REACT_APP_SPOONACULAR}`;
        console.log(URL, "from info component");

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
                console.log("error from info");
            });
    }, [recipeQuery]);

    return data === null ? (
        <h1>LOADING</h1>
    ) : (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <h1>{data.title}</h1>
                            <img src={data.image} alt={data.title}></img>
                            <h3>Cooking Instructions</h3>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {/* {instructionSteps} */}
                                <Interweave content={data.summary} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Info;

// const instructionsArr = data.analyzedInstructions[0].steps;

// let instructionSteps = instructionsArr.map((step, index) => {
//   return (
//     <div key={index}>
//       <span>
//         {index + 1}) {instructionsArr[index].step}
//       </span>
//       <img src={instructionsArr[index].ingredients.image} alt=""></img>
//     </div>
//   );
// });
