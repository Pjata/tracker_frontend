import React, { useState, useRef } from "react";
import useComponentSize from "@rehooks/component-size";
import { Stage, Layer, Circle, Star, Text, Rect, Image } from "react-konva";
import useImage from "use-image";

import styled from "styled-components";

const WIDTH = 640;
const HEIGHT = 349;
const IceRinkImage = props => {
  const [image] = useImage("/icerink.png");
  return (
    <Rect
      x={0}
      y={0}
      width={WIDTH}
      height={HEIGHT}
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
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  box-sizing: border-box;
`;

const IceRink = ({ onEventPlace, events, goToTime, children, rotation }) => {
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
  return (
    <Container>
      <Root ref={ref}>
        <Stage
          ref={stageRef}
          width={canvasWidth}
          height={canvasHeight}
        >
          <Layer
          width={WIDTH}
          height={HEIGHT}
          >
            <IceRinkImage />
            {children}
          </Layer>
        </Stage>
      </Root>
    </Container>
  );
};
export default IceRink;
