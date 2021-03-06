import React, { useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import Column from "./Column";
import { DataContext } from "../App";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    grid: {
        flexGrow: 1,
    },
    main: {
        maxHeight: "70vh",
        marginTop: "1rem",
        // backgroundColor: "264653",
    },
    days: {
        minHeight: "20vh",
        height: "50vh",
        width: "20vw",
    },
    button: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(5),
    },
}));

const DashboardDND = () => {
    const classes = useStyles();

    const value = useContext(DataContext);
    const { state, dispatch, ACTIONS } = value;
    state.dndColumns.main.itemsArr = state.ingredientsArr;
    const [columns, setColumns] = useState(state.dndColumns);

    const MAIN = "main";
    const BIN = "bin";

    // console.log("App state", state);
    // console.log("ingredients", state.ingredientsArr);

    //* this is a beast
    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return; // prevent drag that goes out of drop context
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return; // do nothing if item goes to same position
        }

        //* Handle 3 cases: (1) Create new item (2) Shift item to new column (3) Reorder item in same column
        const startCol = state.dndColumns[source.droppableId]; // column-obj at start of drag.
        const endCol = state.dndColumns[destination.droppableId]; // column-obj at end of drag.
        console.log("I'm dragging", startCol.itemsArr[source.index]);
        console.log("I landed in", endCol.id);

        if (startCol !== endCol) {
            const sourceItems = [...startCol.itemsArr];
            const destinationItems = [...endCol.itemsArr];

            if (startCol.id === MAIN) {
                //* creates a clone of the ingredients list and adds it to a day of the week

                const clone = sourceItems[source.index]; // clone a copy of the ingredient card!

                if (endCol.id === BIN) {
                    sourceItems.splice(source.index, 1);
                } else if (
                    !endCol.itemsArr
                        .map((obj) => obj.content)
                        .includes(clone.content)
                    // don't create a clone if the ingredient already exists in destination
                ) {
                    destinationItems.splice(destination.index, 0, {
                        ...clone,
                        id: uuidv4(),
                        // add clone to destination with new id to prevent drag bug
                    });
                }

                const newState = {
                    ...columns,
                    [startCol.id]: {
                        ...startCol,
                        itemsArr: sourceItems
                            .splice(source.index, 1)
                            .concat([...sourceItems]),
                        // reorder cloned ingredient to the top of the array
                    },
                    [endCol.id]: {
                        ...endCol,
                        itemsArr: destinationItems,
                    },
                };
                setColumns(newState);
                dispatch({ type: ACTIONS.UPDATE_COLS, payload: newState });
            } else {
                //* transfer item to new position (and prevents items being dragged into main list)
                if (endCol.id !== MAIN) {
                    const [removedItem] = sourceItems.splice(source.index, 1); // grab item from source

                    if (endCol.id !== BIN) {
                        destinationItems.splice(
                            destination.index,
                            0,
                            removedItem
                        ); // insert item into destination
                        console.log("I moved");
                    }

                    const newState = {
                        ...columns,
                        [startCol.id]: {
                            ...startCol,
                            itemsArr: sourceItems,
                        },
                        [endCol.id]: {
                            ...endCol,
                            itemsArr: destinationItems,
                        },
                    };
                    setColumns(newState);
                    dispatch({ type: ACTIONS.UPDATE_COLS, payload: newState });
                }
            }
        } else {
            //* reorder items in the same column
            const copiedItems = [...startCol.itemsArr];
            const [removedItem] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removedItem);

            const newState = {
                ...columns,
                [startCol.id]: {
                    ...startCol,
                    itemsArr: copiedItems,
                },
            };

            setColumns(newState);
            dispatch({ type: ACTIONS.UPDATE_COLS, payload: newState });
        }
    };

    return (
        <div>
            <Container>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Grid container className={classes.main}>
                        <Grid item xs={6} sm={3}>
                            <Column
                                key={MAIN}
                                items={columns[MAIN].itemsArr}
                                column={columns[MAIN]}
                            />
                        </Grid>
                        <Grid
                            container
                            xs={12}
                            sm={9}
                            spacing={1}
                            direction="row"
                        >
                            {state.dndColOrder
                                .filter((colId) => colId !== MAIN)
                                .filter((colId) => colId !== BIN)
                                .map((columnId) => {
                                    const column = columns[columnId];

                                    return (
                                        <Grid item xs={6} sm={3}>
                                            <Column
                                                key={column.id}
                                                column={column}
                                                items={column.itemsArr}
                                                className={classes.days}
                                            />
                                        </Grid>
                                    );
                                })}

                            <Grid item xs={6} sm={3} className={classes.bin}>
                                <Column
                                    key={BIN}
                                    items={columns[BIN].itemsArr}
                                    column={columns[BIN]}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DragDropContext>
            </Container>
        </div>
    );
};

export default DashboardDND;
