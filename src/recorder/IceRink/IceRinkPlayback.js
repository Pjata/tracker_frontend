import React, { useState, useContext } from "react";
import IceRink from "./IceRink";
import styled from "styled-components";
import { RecordStateContext } from "./RecordState";

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RinkRoot = styled.div`
  transform: rotate(-90deg);
  top: 0px;
  left: 0px;
  right: 0px;
`;

const imageSize = {
  width: 640,
  height: 349
};
const IceRinkPlayback = props => {
  const { events } = props;

  const { dispatch, state } = useContext(RecordStateContext);
  const onEventTap = event => _ => {
    dispatch({
      type: "SELECTED_EVENT",
      data: event
    });
  };

  return (
    <Root>
      <RinkRoot>
        <IceRink
          events={events}
          imageSize={imageSize}
          onEventTap={onEventTap}
          showEvents
        />
      </RinkRoot>
    </Root>
  );
};

export default IceRinkPlayback;
