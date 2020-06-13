import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { toDisplayTime, toHHMMSS } from "../../common/utility";
import { getTitleBasic } from "./EventListComponent";
import { RecordStateContext } from "../RecordState";
import Events, { getColorForEvent } from "../Events";
import * as R from "ramda";
import { ShotType } from "../ShotTypeSelector";
import { ShotOutcome } from "../ShotOutcomeSelector";

const fProp = R.flip(R.prop);
export const shotType = R.path(["eventData", "shotType"]);
export const shotOutcome = R.path(["eventData", "shotOutcome"]);
export const faceoffType = R.path(["eventData", "faceoffType"]);
export const faceoffEnemy = R.path(["eventData", "enemy"]);
export const shotTypeName = R.compose(
  R.prop("name"),
  fProp(ShotType),
  shotType
);
export const shotOutcomeName = R.compose(
  R.prop("name"),
  fProp(ShotOutcome),
  shotOutcome
);
//F.prop("name")(fProp(ShotType)(shotType)

const Option = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;
const Root = styled.div`
  background-color: ${(props) => props.color};
  display: grid;
  grid-template-rows: 36px 1fr 1fr 1fr;
  grid-gap: 24px;
`;

const ShotEditsRoot = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;
const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;
export const getInfoForSelectedEventType = (selectedEvent) => {
  if (selectedEvent.type === Events.FACEOFF.type) {
    return (
      <div>
        {`${faceoffType(selectedEvent)} against: ${faceoffEnemy(
          selectedEvent
        )}`}
      </div>
    );
  }
  if (selectedEvent.type === Events.SHOOT.type) {
    return (
      <div>
        {shotTypeName(selectedEvent)}:{shotOutcomeName(selectedEvent)}
      </div>
    );
  }
  return null;
};

const EventEdit = (props) => {
  const { updateEvent, currentTime, deleteEvent } = props;
  const currentTimeRef = useRef();
  const { dispatch, state } = useContext(RecordStateContext);
  const { selectedEvent } = state;

  useEffect(() => {
    currentTimeRef.current = currentTime;
  });

  if (!selectedEvent) {
    return <div />;
  }
  const deleteEventEv = (ev) => {
    const newEvent = {
      id: selectedEvent.id,
    };
    deleteEvent(newEvent);
  };
  const deselectEvent = (ev) => {
    dispatch({
      type: "DESELECT_EVENT",
    });
  };
  const editEvent = (ev) => {
    dispatch({
      type: "EDIT_EVENT",
    });
  };
  const editChance = (ev) => {
    dispatch({
      type: "EDIT_CHANCE",
    });
  };
  const changePlayer = (ev) => {
    dispatch({
      type: "SELECT_PLAYER",
    });
  };
  const editShotType = (ev) => {
    dispatch({
      type: "EDIT_SHOT_TYPE",
    });
  };
  const editShotOutcome = (ev) => {
    dispatch({
      type: "EDIT_SHOT_OUTCOME",
    });
  };
  const editSavePosition = (ev) => {
    dispatch({
      type: "EDIT_SAVE_POSITION",
    });
  };
  const setPeriodStart = (ev) => {
    dispatch({
      type: "PERIOD_START_EDIT",
    });
  };
  const getOptionsForEventType = () => {
    if (selectedEvent.type === Events.SHOOT.type) {
      return (
        <TwoColumn>
          <Option onClick={editShotType}>Shot type</Option>
          <Option onClick={editShotOutcome}>Shot outcome</Option>
        </TwoColumn>
      );
    }
    if (selectedEvent.type === Events.SAVE.type) {
      return (
        <TwoColumn>
          <div />
          <Option onClick={editSavePosition}>Save position</Option>
        </TwoColumn>
      );
    }
    if (selectedEvent.type === Events.FACEOFF.type) {
      return (
        <TwoColumn>
          <Option onClick={setPeriodStart}>Set period start</Option>
        </TwoColumn>
      );
    }
  };
  return (
    <Root color={getColorForEvent(selectedEvent)}>
      <div>
        <div>{toDisplayTime(selectedEvent)}</div>
        <div>{getTitleBasic(selectedEvent)}</div>
        {getInfoForSelectedEventType(selectedEvent)}
      </div>

      <TwoColumn>
        <Option onClick={editEvent}>edit event</Option>
        <Option onClick={editChance}>Edit Chance</Option>
      </TwoColumn>
      {getOptionsForEventType()}
      <TwoColumn>
        <Option onClick={deselectEvent}>deselect</Option>
        <Option onClick={deleteEventEv}>delete</Option>
      </TwoColumn>
    </Root>
  );
};

export default EventEdit;
