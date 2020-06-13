import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { RecordStateContext } from "./RecordState";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import * as R from "ramda";
import {getColorForEvent} from '../IceRink/Events'


const Root = styled.div`
  background-color: #2d72b5;
  height: 100%;
  color: white;
`;

export default function ShotTargetPositionSelector(props) {
  const { dispatch, state } = useContext(RecordStateContext);
  const point = R.path(["event", "eventData", "primaryAssist"])(state);

  const ref = useRef(null);

  const rootRef = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch({
      type: "OUTSIDE_CLICK",
    });
  });
  const selectedPrimaryAssistLocation = (evt) => {
    const pt = ref.current.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;

    const { x, y } = pt.matrixTransform(ref.current.getScreenCTM().inverse());
    console.log(x,y)
    dispatch({
      type: "SHOT_PRIMARY_ASSIST_LOCATION_SELECTED",
      data: {
        x,
        y,
      },
    });
  };
  return (
    <Root rootRef={rootRef}>
      <div>Add Primary Pass Location</div>
      <svg
        ref={ref}
        onClick={selectedPrimaryAssistLocation}
        width="640"
        height="349"
        viewBox="0 0 640 349"
      >
        <image href="/icerink.png" width="640" height="349" />
        {point && <circle cx={point.x} cy={point.y} r={5} />}
      </svg>
    </Root>
  );
}
