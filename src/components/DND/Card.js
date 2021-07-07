import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@material-ui/icons/Edit";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

const Item = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 3px;
  background-color: ${(props) => (props.isDragging ? "#dedbd2" : "#f7e1d7")};
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)",
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
        // <Item
        //   {...provided.draggableProps} // identify children
        //   {...provided.dragHandleProps} //allow moving
        //   ref={provided.innerRef} // identify array
        //   isDragging={snapshot.isDragging} //apply style
        // >
        // </Item>
        <ListItem
          ContainerComponent="li"
          ContainerProps={{ ref: provided.innerRef }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <ListItemText
            // primary={props.item.content}
            primary={props.item.content}
          />
          <ListItemSecondaryAction>
            <EditIcon />
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  );
};

export default Card;
