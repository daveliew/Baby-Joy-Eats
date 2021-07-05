import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const Container = styled.div`
  margin: 8px;
  border: 1px solid #dedbd2;
  border-radius: 2px;
  width: 10vw;

  flex-direction: column;
  align-items: center;
`;
const Title = styled.h3`
  padding: 8px;
`;
const ItemList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "#dedbd2" : "#b0c4b1"};
  flex-grow: 1;
  min-height: 30vh;
  overflow-y: scroll;
`;

const Column = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <ItemList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.map((item, index) => (
              <Card key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </ItemList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
