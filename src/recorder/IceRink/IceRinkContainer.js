import React, { useState, useContext } from "react"
import IceRink from "./IceRink"
import uuid from "uuid/v1"
import styled from "styled-components"
import EventWorkflow from "./EventWorkflow/EventWorkflow"
import { RecordStateContext } from "./RecordState";

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const RinkRoot = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
`

const imageSize = {
  width: 640,
  height: 349
}
const IceRinkContainer = props => {
  const {
    events,
    matchId
  } = props
  const { dispatch } = useContext(RecordStateContext);
  const onEventPlace = position => {
    dispatch({
      type: 'EVENT_PLACE',
      data: {
       position,
       eventTime: props.currentTime
      }
    })
  }

  const eventWorkflowProps = {
    imageSize,
    matchId,
  }
  return (
    <Root>
      <RinkRoot>
        <IceRink
          goToTime={props.goToTime}
          events={events}
          onEventPlace={onEventPlace}
          imageSize={imageSize}
        />
      </RinkRoot>
      <RinkRoot>
        <EventWorkflow {...eventWorkflowProps}/>
      </RinkRoot>
    </Root>
  )
}

export default IceRinkContainer
