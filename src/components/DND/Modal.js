import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import EditIcon from "@material-ui/icons/Edit";
import { SaveAlt } from "@material-ui/icons";
import { IconButton, TextField, Form } from "@material-ui/core";

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

  const handleChange = (event) => {
    const value = event.target.value;
    console.log("editing form", value);
    setIngredient(value);
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
            />
            <IconButton onClick={handleClick}>
              <SaveAlt />
            </IconButton>
          </>
        ) : (
          <>
            {props.item}
            <IconButton onClick={handleClick}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      close
    </div>
  );

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default CardModal;
