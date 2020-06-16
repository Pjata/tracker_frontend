import React from "react";
import { useLineup } from "./useLineup";
import { DragDropContext } from "react-beautiful-dnd";
import * as R from "ramda";
import { LineGroup } from "../../recorder/OnIce/LineGroup";

const getListStyle = (customStyle) => (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  display: "flex",
  gridGap: "24px",
  height: "100%",
  ...customStyle,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
  display: "flex",
  alignItems: "center",
  width: "150px",
  margin: "12px",
  justifyContent: "center",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const LineupComponent = (props) => {
  const { lines, onDragEnd } = useLineup();
  if (!lines || R.isEmpty(lines)) {
    return <div>Loading</div>;
  }
  const keyToLineGroup = (key) => {
    const line = lines[key];
    const customStyle = key.includes("ATTACKER")
      ? {
          justifyContent: "flex-end",
        }
      : {};
    return (
      <div>
        {`Line ${key}`}
        <LineGroup
          key={key}
          onClick={() => {}}
          players={line}
          droppableId={`onLine-${key}`}
          direction="horizontal"
          getItemStyle={getItemStyle}
          getListStyle={getListStyle(customStyle)}
        />
      </div>
    );
  };
  const getPosition = (key) => key.split("_")[1];
  const getRow = (key) => Number(key.split("_")[0]);
  const mapToLineGroups = R.compose(
    R.map(R.map(keyToLineGroup)),
    R.groupBy(getPosition),
    R.tap(console.log),
    R.sort((a, b) => getRow(a) - getRow(b)),
    R.keys
  );
  const lineGroups = mapToLineGroups(lines);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "24px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridAutoRows: "100px",
            gridGap: "24px",
            height: "100%",
          }}
        >
          {lineGroups.ATTACKER}
        </div>
        <div
          style={{
            display: "grid",
            gridAutoRows: "100px",
            gridGap: "24px",
            height: "100%",
          }}
        >
          {lineGroups.DEFENDER}
        </div>
      </div>
    </DragDropContext>
  );
};
