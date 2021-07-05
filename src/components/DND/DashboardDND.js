import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import initialData from "../../data/initialData";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: flex;
  height: 50vh;
  overflow: scroll;
`;

const DashboardDND = () => {
  const [stateObj, setStateObj] = useState(initialData);

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
        const item = sourceItems[source.index]; // clone a copy!
        destinationItems.splice(destination.index, 0, {
          ...item,
          id: uuidv4(),
        }); // add clone to destination with new id

        const fromCol = {
          ...startCol,
          itemsArr: startCol.itemsArr,
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
  };

  return (
    <div className="Dashboard-DND">
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {stateObj.columnOrder.map((columnId) => {
            const column = stateObj.columns[columnId];

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
