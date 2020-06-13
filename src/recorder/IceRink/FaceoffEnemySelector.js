import React, { useRef, useContext, useState } from "react";
import styled from "styled-components";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import { RecordStateContext } from "./RecordState";
import JerseyInput from "./JerseyInput";

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

const Column2 = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
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

const FaceoffEnemySelector = ({ setMode, imageSize, onSelect }) => {
  const { dispatch } = useContext(RecordStateContext);
  const [value, setValue] = useState("");

  const onChange = ev => {
    if (ev.target.value.length > 2) {
      return;
    }
    setValue(ev.target.value);
  };

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch({
      type: 'OUTSIDE_CLICK'
    })
  });


  const onEnter = ev => {
    dispatch({
      type: 'FACEOFF_ENEMY_SELECTED',
      data: Number(value)
    })
  }
  const onLater = ev => {
    dispatch({
      type: 'FACEOFF_ENEMY_SELECTED',
      data: null
    })
  }

  return (
    <Root ref={ref} height={imageSize.height}>
      <Column2>
        <JerseyInput value={value} onChange={onChange} />
      </Column2>
      <Choice onClick={onLater}>#Later</Choice>
      <Choice onClick={onEnter}>Enter</Choice>
    </Root>
  );
};

export default FaceoffEnemySelector;
