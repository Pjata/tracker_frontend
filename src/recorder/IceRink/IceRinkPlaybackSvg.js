import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { RecordStateContext } from "./RecordState";
import { getColorForEvent } from "./Events";
import useOnClickOutside from "../common/hooks/useOnClickOutside";

const Root = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RotationDiv = styled.div`
  transform: rotate(${props => (props.vertical ? "90deg" : "0deg")});
`;

const getEventCircles = onEventTap => events =>
  events.map(event => {
    const {
      position: { x, y }
    } = event;
    return (
      <circle
        onClick={onEventTap(event)}
        key={event.id}
        cx={x}
        cy={y}
        stroke="black"
        r={5}
        fill={getColorForEvent(event)}
      ></circle>
    );
  });
export default function IceRinkPlaybackSvg(props) {
  const { vertical, events } = props;

  const { dispatch, state } = useContext(RecordStateContext);
  const { selectedEvent } = state;
  const eventsToDisplay = selectedEvent ? [selectedEvent] : events;
  const onEventTap = event => _ => {
    const selected = selectedEvent && selectedEvent.id === event.id ? null : event;
    dispatch({
      type: "SELECTED_EVENT",
      data: selected
    });
  };
  return (
    <Root >
      <RotationDiv vertical={vertical}>
        <svg width="640" height="349" viewBox="0 0 640 349">
          <image href="/icerink.png" width="640" height="349" />
          {getEventCircles(onEventTap)(eventsToDisplay)}
        </svg>
      </RotationDiv>
    </Root>
  );
}
