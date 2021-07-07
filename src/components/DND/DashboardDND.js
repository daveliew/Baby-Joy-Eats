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
  state.dndColumns.main.itemsArr = state.ingredientsArr;
  const [columns, setColumns] = useState(state.dndColumns);

  const MAIN = "main";

  console.log("App state", state);
  console.log("ingredients", state.ingredientsArr);
  console.log("col itemsArr", state.dndColumns.main.itemsArr);

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

    const startCol = state.dndColumns[source.droppableId]; // column-obj at start of drag.
    const endCol = state.dndColumns[destination.droppableId]; // column-obj at end of drag.
    console.log("I'm dragging", startCol.itemsArr[source.index]);

    if (startCol !== endCol) {
      const sourceItems = [...startCol.itemsArr];
      const destinationItems = [...endCol.itemsArr];

      if (startCol.id === MAIN) {
        //* creates a clone of the ingredients list and adds it to a day of the week

        const clone = sourceItems[source.index]; // clone a copy of the ingredient card!
        // sourceItems.splice(source.index, 1);
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
              //! reorder cloned ingredient to the top of the array
            },
            [endCol.id]: {
              ...endCol,
              itemsArr: destinationItems,
            },
          };
          setColumns(newState);
          dispatch({ type: ACTIONS.UPDATE_COLS, payload: newState });
        }
      } else {
        //* transfer item to new position (and prevents items being dragged into main list)
        if (endCol.id !== MAIN) {
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
          dispatch({ type: ACTIONS.UPDATE_COLS, payload: newState });
        }
      }
    } else {
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

      dispatch({ type: ACTIONS.UPDATE_COLS, payload: newState });
    }
  };

  return (
    <div className="Dashboard-DND">
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR_PLANNER })}>
        Clear Planner
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Column
            key={MAIN}
            items={columns[MAIN].itemsArr}
            column={columns[MAIN]}
            //! I split the main items from the rest of the render. wondering if safe.
          />
          {state.dndColOrder
            .filter((colId) => colId !== MAIN)
            .map((columnId) => {
              const column = columns[columnId];

              return (
                <Column
                  key={column.id}
                  column={column}
                  items={column.itemsArr}
                />
              );
            })}
        </Container>
      </DragDropContext>
    </div>
  );
};

export default DashboardDND;
