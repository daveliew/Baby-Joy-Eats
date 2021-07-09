import React from "react";
// import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import {
  Avatar,
  Grid,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@material-ui/core";
import CardModal from "./CardModal";

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "#2A9D8F",
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
        <Grid container direction="column">
          <Grid item xs>
            <ListItem
              {...provided.dragHandleProps} //allow moving
              alignItems="flex-start"
              ContainerComponent="li"
              ContainerProps={{ ref: provided.innerRef }} // identify array
              {...provided.draggableProps} // identify children
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style //apply style
              )}
            >
              <ListItemAvatar>
                <Avatar>{props.item.content.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={props.item.content}
                secondary={props.id.substring(0, 8)}
              />
              <ListItemSecondaryAction>
                <CardModal
                  item={props.item.content}
                  id={props.item.id}
                  colId={props.colId}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </Grid>
        </Grid>
      )}
    </Draggable>
  );
};

export default Card;
