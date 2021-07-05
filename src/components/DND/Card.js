import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Item = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #f7e1d7;
  border-radius: 3px;
`;

// background-color: ${(props) => (props.isDragging ? "#edafb8" : "#f7e1d7")};
const Card = (props) => {
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <Item
          {...provided.draggableProps} // identify children
          {...provided.dragHandleProps} //allow moving
          ref={provided.innerRef} // identify array
          isDragging={snapshot.isDragging} //apply style
        >
          {props.item.content}
        </Item>
      )}
    </Draggable>
  );
};

export default Card;
