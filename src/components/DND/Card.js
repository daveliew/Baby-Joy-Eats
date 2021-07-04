import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

const Card = (props) => {
  return (
    <Draggable draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps} // identify children
          {...provided.dragHandleProps} //allow moving
          ref={provided.innerRef} // identify araay
          isDragging={snapshot.isDragging} //apply style
        >
          {props.item.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Card;
