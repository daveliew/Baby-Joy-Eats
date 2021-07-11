import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ingredientsArr from "../data/ingredientsData";

const PlannerDND = () => {
  const [ingredients, setIngredients] = useState(ingredientsArr);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(ingredients);
    const [reorderedItem] = items.splice(result.source.index, 1); //extract item
    items.splice(result.destination.index, 0, reorderedItem); //inject item in new index

    setIngredients(items); // put back ingredients to state
  };

  return (
    <div className="dnd">
      <div className="planner-dnd">
        <h1>
          This will be a 7 x 4 weekly view where ingredients can be dropped in
        </h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="ingredients">
            {(provided) => (
              <ul
                className="ingredients"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {ingredients.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="ingredients-thumb"></div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <p>Drag and Drop ends</p>
      </div>
    </div>
  );
};

export default PlannerDND;
