import React from "react";
// import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import CardModal from "./Modal";

// const Item = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
//   border-radius: 3px;
//   background-color: ${(props) => (props.isDragging ? "#dedbd2" : "#f7e1d7")};
// `;

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "#dedbd2",
  }),
});

const Card = (props) => {
  return (
    <Draggable
      key={props.item.id}
      draggableId={props.item.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <ListItem
          {...provided.dragHandleProps} //allow moving
          // alignItems="flex-start"
          ContainerComponent="li"
          ContainerProps={{ ref: provided.innerRef }} // identify array
          {...provided.draggableProps} // identify children
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style //apply style
          )}
        >
          <ListItemText
            primary={props.item.content}
            secondary={props.item.id}
          />
          <ListItemSecondaryAction>
            <CardModal item={props.item.content} id={props.item.id}/>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  );
};

export default Card;
