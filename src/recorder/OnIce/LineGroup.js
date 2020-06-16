import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyleDefault = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyleDefault = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  minHeight: 250,
});

export const LineGroup = ({
  droppableId,
  players,
  onClick,
  direction,
  buttonLabel = "Add",
  getListStyle = getListStyleDefault,
  getItemStyle = getItemStyleDefault,
}) => (
  <Droppable droppableId={droppableId} direction={direction}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
      >
        {players.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                {item.name}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);
