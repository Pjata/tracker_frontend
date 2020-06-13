import React, { useRef, useContext } from "react";
import styled from "styled-components";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import { RecordStateContext } from "./RecordState";
import * as R from "ramda";

const TimeDifferences = [
  {
    label:'0-2',
    value: '0-2'
  },
  {
    label: '2-5',
    value: '2-5'
  },
  {
    label: '5-10',
    value:'5-10'
  },
  {
    label: '10+',
    value: '10+'
  }
]

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
  background-color: ${props => props.selected ? 'green' : "#7780c1"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 32px;
  user-select: none;
`;

const ShotPrimaryAssistTimeDifferenceSelector = ({ setMode, imageSize, onSelect }) => {
  const { dispatch, state } = useContext(RecordStateContext);
  const prev = R.path(["event", "eventData", "assistTimeDifference"])(state);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch({
      type: "OUTSIDE_CLICK",
    });
  });
  const onSelectDifference = diff => () => {
    dispatch({
      type: "PRIMARY_ASSIST_TIME_DIFFERENCE_SELECTED",
      data: diff.value
    });
  };
  const ChoiceComp = ({ timeDifference }) => {
    return (
      <Choice key={timeDifference.value} onClick={onSelectDifference(timeDifference)} selected={timeDifference.value === prev}>
        {timeDifference.label}
      </Choice>
    );
  };
  const eventComps = TimeDifferences.map( timeDifference=> (
    <ChoiceComp timeDifference={timeDifference} />
  ));

  return (
    <div>
      Assist Time Difference
    <Root ref={ref} height={imageSize.height}>
      {eventComps}
    </Root>
    </div>
  );
};

export default ShotPrimaryAssistTimeDifferenceSelector;
