import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { RecordStateContext } from "./RecordState";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import * as R from "ramda";

const Root = styled.div`
  height: 100%;
`;

export default function ShotTargetPositionSelector(props) {
  const { dispatch, state } = useContext(RecordStateContext);
  const point = R.path(["event", "eventData", "shotPosition"])(state);

  const ref = useRef(null);
  
  const rootRef = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch({
      type: 'OUTSIDE_CLICK'
    })
  });
  const alertCoords = evt => {
    const pt = ref.current.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;

    const { x, y } = pt.matrixTransform(ref.current.getScreenCTM().inverse());
    dispatch({
      type: "SHOT_TARGET_POSITION_SELECTED",
      data: {
        x,
        y
      }
    });
  };

  return (
    <Root ref={rootRef}>
      <svg
        onClick={alertCoords}
        ref={ref}
        width="540"
        height="388"
        viewBox="0 0  540 388"
      >
        <image href="/hockeynet.jpg" width="540" height="388" />
        {point && <circle cx={point.x} cy={point.y} r={5} />}
      </svg>
    </Root>
  );
}
