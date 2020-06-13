import React, { useRef, useContext } from "react"
import styled from "styled-components"
import Events from "./Events"
import useOnClickOutside from "../common/hooks/useOnClickOutside"
import useTeamHook from "./PlayerSelector/TeamHook/useTeamHook"
import { RecordStateContext } from "./RecordState";

const Root = styled.div`
  width: 100%;
  height: ${props => `${props.height - 15}px`}
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  box-sizing: content-box;
  padding: 8px;
`

const Choice = styled.div`
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 36px;
  user-select: none;
`
const colors = []

const Selector = ({ imageSize }) => {
  const {dispatch } = useContext(RecordStateContext);
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    dispatch({
      type: 'OUTSIDE_CLICK'
    })
  });
  const onSelectType = faceoffType => () => {
    dispatch({
      type: 'FACEOFF_EVENT_DATA_SELECTED',
      data: {
        faceoffType
      }
    })
  }

  return (
    <Root ref={ref} height={imageSize.height}>
      <Choice
        key={'LOSS'}
        color={"#ff6961"}
        onClick={onSelectType("LOSS")}
      >
        LOSS
      </Choice>
      <Choice
        key={"WIN"}
        color={"#77dd77"}
        onClick={onSelectType('WIN')}
      >
        WIN
      </Choice>
    </Root>
  )
}

export default Selector
