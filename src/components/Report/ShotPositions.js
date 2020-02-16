import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import * as R from "ramda";

const Root = styled.div`
  height: 100%;
`;

export default function ShotPosition(props) {
  const {events} = props
  const point = R.path(["eventData", "shotPosition"]);
  const circles = events.filter(point).map(event => {
    const {x: cx,y:cy} = point(event)
    return <circle key={event.id} cx={cx} cy={cy} r={5} />

  })

  return (
    <Root>
      <svg width="540" height="388" viewBox="0 0  540 388">
        <image href="/hockeynet.jpg" width="540" height="388" />
        {circles}
      </svg>
    </Root>
  );
}
