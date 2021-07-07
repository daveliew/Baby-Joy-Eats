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
  const [stateObj, setStateObj] = useState(state.dndData);

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

    const startCol = stateObj.columns[source.droppableId]; // column-obj at start of drag.
    const endCol = stateObj.columns[destination.droppableId]; // column-obj at end of drag.

    console.log("I'm dragging", startCol);

    if (startCol !== endCol) {
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
            ...stateObj,
            columns: {
              ...stateObj.columns,
              [startCol.id]: fromCol,
              [endCol.id]: toCol,
            },
          };
          setStateObj(newState);
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
          ...stateObj,
          columns: {
            ...stateObj.columns,
            [startCol.id]: fromCol,
            [endCol.id]: toCol,
          },
        };
        setStateObj(newState);
      }
    } else {
      //* reorder items in the same column
      const copiedItems = [...startCol.itemsArr];
      const [removedItem] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removedItem);

      const updatedCol = {
        ...startCol,
        itemsArr: copiedItems,
      };

      const newState = {
        ...stateObj,
        columns: {
          ...stateObj.columns,
          [startCol.id]: updatedCol,
        },
      };

      setStateObj(newState);
    }
    dispatch({ type: ACTIONS.UPDATE_INGREDIENTS, payload: stateObj });
  };

  return (
    <div className="Dashboard-DND">
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Column
            key={"main"}
            column={stateObj.columns["main"]}
            items={state.ingredientsArr}
          />
          {stateObj.columnOrder
            .filter((column) => column !== "main") //! bypass main to map rest of columns
            .map((columnId) => {
              const column = stateObj.columns[columnId];
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
