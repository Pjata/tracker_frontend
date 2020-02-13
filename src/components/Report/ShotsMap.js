import React from "react";
import {
  map,
  mapObjIndexed,
  filter,
  prop,
  propEq,
  groupBy,
  sort,
  pipe,
  toPairs,
  head
} from "ramda";
import { distance, faceOffPositions, addFaceoffZone } from "./useReportHook";
import { Circle, Text, Rect, Image } from "react-konva";
import IceRink from "../IceRink";

export default function FaceoffMap(props) {
  const { type, events, label } = props;
  const typeEvents = filter(propEq("type", "SHOOT"));
  const filteredEvents = typeEvents(events);

  const toCircle = event => {
    const dimensions = {
      width: 10,
      height: 10,
      offsetX: 5,
      offsetY: 5
    };
    return (
        <Circle
          key={event.id}
          {...dimensions}
          fill="green"
          x={event.position.x}
          y={event.position.y}
        />
    );
  };

  const shots = map(toCircle)(filteredEvents)
  return <IceRink >{shots}</IceRink>;
}
