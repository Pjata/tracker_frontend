import React, { useRef, useContext } from "react";
import styled from "styled-components";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import { RecordStateContext } from "./RecordState";

const Root = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  box-sizing: content-box;
  height: ${props => props.height}px;
`;

const Choice = styled.div`
  background-color: #3e3e66;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 36px;
  user-select: none;
`;

const EventEditPopup = ({ imageSize, matchId }) => {
  const { dispatch, state } = useContext(RecordStateContext);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch({
      type: 'OUTSIDE_CLICK'
    })
  });

  const onChangePlayer = () => {
    dispatch({
      type: 'CHANGE_PLAYER'
    })

  }

  const onChangeEvent = () => {
    dispatch({
      type: 'CHANGE_EVENT'
    })

  }

  return (
    <Root ref={ref} height={imageSize.height}>
      <Choice onClick={onChangePlayer}>
        Change Player
      </Choice>
      <Choice onClick={onChangeEvent}>
        Change Event
      </Choice>
    </Root>
  );
};

export default EventEditPopup;
