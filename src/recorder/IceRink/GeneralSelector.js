import React, { useRef, useContext } from "react";
import styled from "styled-components";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import { RecordStateContext } from "./RecordState";
import * as R from "ramda";


const Root = styled.div`
  width: 100%;
  height: ${props => `${props.height - 15}px`};
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
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

const GeneralSelector = ({ label, imageSize, type, choices, typeKey }) => {
  const { dispatch, state } = useContext(RecordStateContext);
  const ref = useRef(null);
  const prev = R.path(["event", "eventData", typeKey])(state);
  useOnClickOutside(ref, () => {
    dispatch({
      type: "OUTSIDE_CLICK",
    });
  });
  const onSelect = diff => () => {
    dispatch({
      type,
      data: diff.value
    });
  };
  const ChoiceComp = ({ item }) => {
    
    return (
      <Choice selected={prev === item.value} key={item.value} onClick={onSelect(item)}>
        {item.label}
      </Choice>
    );
  };
  const eventComps = choices.map( item=> (
    <ChoiceComp item={item} />
  ));

  return (
    <div>
      {label}
    <Root ref={ref} height={imageSize.height}>
      {eventComps}
    </Root>
    </div>
  );
};

export default GeneralSelector;
