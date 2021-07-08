import React, { useContext, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Done, Edit } from "@material-ui/icons";
import { Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { DataContext } from "../App";

import RecipeAjax from "../Ajax/RecipeAjax";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CardModal = (props) => {
  const value = useContext(DataContext);
  const { dispatch, ACTIONS } = value;

  const { inputRef } = useRef(); //! buggy
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ingredient, setIngredient] = useState(props.item);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setEdit(!edit);
  };

  const handleSubmit = () => {
    setEdit(!edit);
    dispatch({
      type: ACTIONS.EDIT_INGREDIENT,
      payload: { content: ingredient, id: props.id, colId: props.colId },
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("editing form", value);
    setIngredient(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      document.getElementById("saveBtn").click();
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">
        {edit ? (
          <>
            <TextField
              onChange={handleChange}
              id="standard-basic"
              label="Edit Ingredient"
              value={ingredient}
              onKeyPress={handleKeyPress}
              ref={inputRef}
            />
            <IconButton id="saveBtn" onClick={handleSubmit}>
              <Done />
            </IconButton>
          </>
        ) : (
          <>
            <Grid container>
              <Typography>{props.item}</Typography>
              <IconButton onClick={handleClick}>
                <Edit />
              </IconButton>
            </Grid>
          </>
        )}
      </h2>
      <p id="simple-modal-description">{props.item}</p>

      {/* <RecipeAjax /> */}
    </div>
  );

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Edit />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        item={props.item}
        color="primary"
      >
        {body}
      </Modal>
    </div>
  );
};

export default CardModal;
