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
import { filterWins } from "./FaceoffBasic";

export default function FaceoffMap(props) {
  const { type, events, label } = props;
  const typeEvents = filter(propEq("type", "FACEOFF"));
  const filteredEvents = typeEvents(events);

  const eventsWithFaceoffZone = addFaceoffZone(filteredEvents);
  const wins = filterWins(eventsWithFaceoffZone)
  console.log(eventsWithFaceoffZone);
  const toText = eventsWithFaceoffZone => (num, key, obj) => {
    const eventsForKey = filter(propEq("faceOffZone", key));
    const size = eventsForKey(eventsWithFaceoffZone);
    const winSize = eventsForKey(wins);
    const dimensions = {
      width: 50,
      height: 50,
      offsetX: 25,
      offsetY: 25
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
          text={`${winSize.length}/${size.length}`}
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
