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

  //! fix state ingredient passing down here
  const [dndColumns, setDndColumns] = useState(state.dndColumns);
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

    const startCol = dndColumns[source.droppableId]; // column-obj at start of drag.
    const endCol = dndColumns[destination.droppableId]; // column-obj at end of drag.
    console.log("I'm dragging", startCol);

    if (startCol === endCol) {
      //* reorder items in the same column

      const copiedItems = [...startCol.itemsArr];
      const [removedItem] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removedItem);

      const updatedCol = {
        ...startCol,
        itemsArr: copiedItems,
      };
      console.log(copiedItems);
      const newState = {
        ...dndColumns,
        columns: {
          ...dndColumns,
          [startCol.id]: updatedCol,
        },
      };

      setDndColumns(newState);
      console.log("reordering", newState);
    } else {
      const sourceItems = [...startCol.itemsArr];
      const destinationItems = [...endCol.itemsArr];

      if (startCol.id === "main") {
        //* creates a clone of the ingredients list and adds it to a day of the week
        const mainItems = [...state.ingredientsArr];
        const item = mainItems[source.index]; // clone a copy!
        sourceItems.splice(source.index, 1);
        if (!endCol.itemsArr.map((obj) => obj.content).includes(item.content)) {
          //* checks if ingredient already exists in destination
          destinationItems.splice(destination.index, 0, {
            ...item,
            id: uuidv4(),
          }); // add clone to destination with new id
          const fromCol = {
            ...startCol,
            itemsArr: sourceItems,
          };
          const toCol = {
            ...endCol,
            itemsArr: destinationItems,
          };

          const newState = {
            ...dndColumns,
            columns: {
              ...dndColumns.columns,
              [startCol.id]: fromCol,
              [endCol.id]: toCol,
            },
          };
          setDndColumns(newState);
        }
      } else {
        //* transfer item to new position
        const [removedItem] = sourceItems.splice(source.index, 1); // grab item from sourceCol itemsArr
        destinationItems.splice(destination.index, 0, removedItem); // insert item into destCol itemsArr

        const fromCol = {
          ...startCol,
          itemsArr: sourceItems,
        };

        const toCol = {
          ...endCol,
          itemsArr: destinationItems,
        };

        const newState = {
          ...dndColumns,
          columns: {
            ...dndColumns.columns,
            [startCol.id]: fromCol,
            [endCol.id]: toCol,
          },
        };
        setDndColumns(newState);
      }
    }
    dispatch({ type: ACTIONS.UPDATE_INGREDIENTS, payload: dndColumns });
  };

  return (
    <div className="Dashboard-DND">
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR_PLANNER })}>
        Clear Planner
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {colOrder.map((columnId) => {
            const column = dndColumns[columnId];
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
