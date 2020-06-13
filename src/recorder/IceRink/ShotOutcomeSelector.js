import React, { useRef, useContext } from "react";
import styled from "styled-components";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import { RecordStateContext } from "./RecordState";

export const ShotOutcome = {
  SHOT_ON_GOAL: {
    name: "SHOT ON GOAL",
    type: "SHOT_ON_GOAL",
  },
  MISSED_THE_GOAL: {
    name: "MISSED THE GOAL",
    type: "MISSED_THE_GOAL"
  },
  BLOCKED: {
    name: "BLOCKED",
    type: "BLOCKED"
  },
  GOAL: {
    name: "GOAL",
    type: "GOAL"
  },
};
const getShotOutcomes = () => Object.keys(ShotOutcome);

const Root = styled.div`
  width: 100%;
  height: ${props => `${props.height - 15}px`};
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
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

const ShotOutcomeSelector = ({ setMode, imageSize, onSelect }) => {
  const { dispatch } = useContext(RecordStateContext);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch({
      type: "OUTSIDE_CLICK",
    });
  });
  const onSelectOutcome = shotOutcome => () => {
    dispatch({
      type: "SHOT_OUTCOME_SELECTED",
      data: shotOutcome
    });
  };
  const ChoiceComp = ({ shotOutcome }) => {
    return (
      <Choice key={shotOutcome.name} onClick={onSelectOutcome(shotOutcome)}>
        {shotOutcome.name}
      </Choice>
    );
  };
  const eventComps = getShotOutcomes().map(key => (
    <ChoiceComp shotOutcome={ShotOutcome[key]} />
  ));

  return (
    <Root ref={ref} height={imageSize.height}>
      {eventComps}
    </Root>
  );
};

export default ShotOutcomeSelector;
