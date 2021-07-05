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

//!
const createClone = (obj) => {
  const clone = {
    id: uuidv4(),
    content: obj.content,
  };
  console.log("clone made", clone);
  return clone;
};

const createItem = (info, state) => {
  const item = createClone(info);
  state.items[item.id] = item;
  return item;
};

//!

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
      let sourceItems = [...startCol.itemsArr];
      const destinationItems = [...endCol.itemsArr];
      const [removedItem] = sourceItems.splice(source.index, 1); // grab item from sourceCol itemsArr
      destinationItems.splice(destination.index, 0, removedItem); // insert item into destCol itemsArr

      //* creates a clone of the item that has been dragged from main ingredients list to a day of the week
      //! test
      if (startCol.id === "main") {
        const copiedItem = removedItem;
        // // console.log(copiedItem);
        // // startCol.itemsArr = [copiedItem, ...startCol.itemsArr
        // const test = createItem(copiedItem, stateObj);
        // startCol.itemsArr = [test.id, ...startCol.itemsArr];
        // console.log("cloning item", startCol.itemsArr);
        // destinationItems.splice(destination.index, 0, test);

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
