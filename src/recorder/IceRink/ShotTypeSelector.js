import React, { useRef, useContext } from "react";
import styled from "styled-components";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import { RecordStateContext } from "./RecordState";

export const ShotType = {
  WRIST: {
    name: "WRIST",
    type: "WRIST"
  },
  SNAP: {
    name: "SNAP",
    type: "SNAP"
  },

  SLAP: {
    name: "SLAP",
    type: "SLAP"
  },
  BACKHAND: {
    name: "BACKHAND",
    type: "BACKHAND"
  },
  ONE_TIMER: {
    name: "ONE-TIMER",
    type: "ONE_TIMER"
  },
  TIP_IN: {
    name: "TIP IN",
    type: "TIP_IN"
  },
  DEFLECTION: {
    name: "DEFLECTION",
    type: "DEFLECTION"
  },
  OTHER: {
    name: "OTHER",
    type: "OTHER"
  }
};
const getShotTypes = () => Object.keys(ShotType);

const Root = styled.div`
  width: 100%;
  height: ${props => `${props.height - 15}px`};
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  box-sizing: content-box;
  padding: 8px;
`;

const Choice = styled.div`
  background-color: #7780c1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 32px;
  user-select: none;
`;

const ShotTypeSelector = ({ setMode, imageSize, onSelect }) => {
  const { dispatch } = useContext(RecordStateContext);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch({
      type: 'OUTSIDE_CLICK'
    })
  });
  const onSelectType = shotType => () => {
    dispatch({
      type: "SHOT_TYPE_SELECTED",
      data: shotType
    });
  };
  const ChoiceComp = ({ shotType }) => {
    return (
      <Choice key={shotType.name} onClick={onSelectType(shotType)}>
        {shotType.name}
      </Choice>
    );
  };
  const eventComps = getShotTypes().map(key => (
    <ChoiceComp shotType={ShotType[key]} />
  ));

  return (
    <Root ref={ref} height={imageSize.height}>
      {eventComps}
    </Root>
  );
};

export default ShotTypeSelector;
