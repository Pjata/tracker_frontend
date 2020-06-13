import React, { useState, useRef } from "react";
import useComponentSize from "@rehooks/component-size";
import { Stage, Layer, Circle, Star, Text, Rect, Image } from "react-konva";
import useImage from "use-image";

import styled from "styled-components";
import { getColorForEvent } from "./Events";

const IceRinkImage = props => {
  const [image] = useImage("/icerink.png");
  return (
    <Rect
      x={0}
      y={0}
      width={640}
      height={349}
      fillPatternImage={image}
      {...props}
    />
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Root = styled.div`
  width: 640px;
  height: 349px;
  box-sizing: border-box;
`;

const IceRink = ({ onEventPlace, onEventTap, events, showEvents }) => {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const size = useComponentSize(ref);

  const canvasWidth = size.width;
  const canvasHeight = size.height;
  const getMousePosition = event => {
    return {
      x: event.evt.layerX,
      y: event.evt.layerY
    };
  };
  const getTouchPosition = event => {
    const { changedTouches } = event.evt;
    const touch = changedTouches[0];
    console.log(touch);
    return {
      x: touch.clientX,
      y: touch.clientY
    };
  };
  const onTouchStart = event => {
    onEventPlace && onEventPlace(stageRef.current.getPointerPosition());
  };
  const onMouseClick = event => {
    const mousePos = getMousePosition(event);
    onEventPlace && onEventPlace(mousePos);
  };
  const onCircleTap = time => ev => {
    onMouseClick(ev);
  };
  const getCircles = () => {
    return events.map(event => {
      const {
        position: { x, y }
      } = event;
      return (
        <Circle
          onMouseDown={onEventTap(event)}
          key={event.id}
          x={x}
          y={y}
          radius={5}
          fill={getColorForEvent(event)}
        ></Circle>
      );
    });
  };
  return (
    <Container>
      <Root ref={ref}>
        <Stage ref={stageRef} width={canvasWidth} height={canvasHeight}>
          <Layer>
            <IceRinkImage onMouseDown={onMouseClick} onTap={onTouchStart} />
            {showEvents && getCircles()}
          </Layer>
        </Stage>
      </Root>
    </Container>
  );
};
export default IceRink;
