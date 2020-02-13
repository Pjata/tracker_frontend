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
import { Label, Text, Rect, Image } from "react-konva";
import IceRink from "../IceRink";

export default function FaceoffMap(props) {
  const { type, events, label } = props;
  const typeEvents = filter(propEq("type", "FACEOFF"));
  const filteredEvents = typeEvents(events);

  const eventsWithFaceoffZone = addFaceoffZone(filteredEvents);
  console.log(eventsWithFaceoffZone);
  const toText = eventsWithFaceoffZone => (num, key, obj) => {
    const eventsForKey = filter(propEq("faceOffZone", key));
    const size = eventsForKey(eventsWithFaceoffZone);
    const dimensions = {
      width: 30,
      height: 30,
      offsetX: 15,
      offsetY: 15
    };
    return (
      <>
        <Rect
          key={key}
          {...dimensions}
          fill="white"
          x={num.x}
          y={num.y}
          stroke="black"
          strokeWidth="1px"
        />
        <Text
          text={size.length}
          fontSize={20}
          {...dimensions}
          x={num.x}
          y={num.y}
          verticalAlign="middle"
          align="center"
        />
      </>
    );
  };
  const texts = pipe(
    mapObjIndexed(toText(eventsWithFaceoffZone)),
    toPairs,
    map(prop(1))
  );

  console.log(texts(faceOffPositions));
  return <IceRink>{texts(faceOffPositions)}</IceRink>;
}
