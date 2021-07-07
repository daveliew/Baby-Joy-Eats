import React, { useState, useContext } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Column from "./Column";
import { DataContext } from "../App";

const Container = styled.div`
  display: flex;
  height: 50vh;
  overflow-y: scroll;
  padding: 0.5rem;
`;

const DashboardDND = () => {
  const value = useContext(DataContext);
  const { state, dispatch, ACTIONS } = value;

  const [columns, setColumns] = useState(state.dndColumns);
  const colOrder = state.dndColOrder;

  console.log("app state", state);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startCol = columns[source.droppableId]; // column-obj at start of drag.
    const endCol = columns[destination.droppableId]; // column-obj at end of drag.
    console.log("I'm dragging", startCol);

    if (startCol === endCol) {
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
      // console.log("reordering", newState);
    } else {
      const sourceItems = [...startCol.itemsArr];
      const destinationItems = [...endCol.itemsArr];

      if (startCol.id === "main") {
        //* creates a clone of the ingredients list and adds it to a day of the week
        const clone = sourceItems[source.index]; // clone a copy of the ingredient card!

        if (
          !endCol.itemsArr.map((obj) => obj.content).includes(clone.content)
          // don't create a clone if the ingredient already exists in destination
        ) {
          destinationItems.splice(destination.index, 0, {
            ...clone,
            id: uuidv4(),
            // add clone to destination with new id to prevent drag bug
          });

          const newState = {
            ...columns,
            [startCol.id]: {
              ...startCol,
              itemsArr: sourceItems
                .splice(source.index, 1)
                .concat([...sourceItems]),
              //reorder cloned ingredient to the top of the array
            },
            [endCol.id]: {
              ...endCol,
              itemsArr: destinationItems,
            },
          };
          setColumns(newState);
        }
      } else {
        //* transfer item to new position
        const [removedItem] = sourceItems.splice(source.index, 1); // grab item from source
        destinationItems.splice(destination.index, 0, removedItem); // insert item into destination

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
      }
    }
    dispatch({ type: ACTIONS.UPDATE_COLS, payload: columns });
  };

  return (
    <div className="Dashboard-DND">
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR_PLANNER })}>
        Clear Planner
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {colOrder.map((columnId) => {
            const column = columns[columnId];
            return (
              <Column key={column.id} column={column} items={column.itemsArr} />
            );
          })}
        </Container>
      </DragDropContext>
    </div>
  );
};

export default DashboardDND;
