import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import { List, Grid, Typography } from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#e76f51" : "#e9c46a",
});

const Container = styled.div`
  margin: 8px;
  border: 1px solid #e76f51;
  border-radius: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  height: 80%;
  flex-grow: 1;
  min-width: 10vh;
  min-height: 30vh;
`;

const Column = (props) => {
  return (
    <Container>
      <Typography title gutterBottom>
        {props.column.title}
      </Typography>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <List style={getListStyle(snapshot.isDraggingOver)}>
              {props.items.map((item, index) => (
                <Card
                  key={item.id}
                  item={item}
                  index={index}
                  id={item.id}
                  colId={props.column.id}
                />
              ))}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;

// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//       maxWidth: 752,
//     },
//     demo: {
//       backgroundColor: theme.palette.background.paper,
//     },
//     title: {
//       margin: theme.spacing(4, 0, 2),
//     },
//   })
// );
