import React, { useContext } from "react";
import styled from "styled-components";
import { toHHMMSS, toDisplayTime } from "../../common/utility";
import { RecordStateContext } from "../RecordState";
import Events, { getColorForEvent } from "../Events";
import {
  faceoffEnemy,
  faceoffType,
  shotTypeName,
  shotOutcomeName
} from "./EventEdit";
import chroma from "chroma-js";

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fill, 120px);
  width: 100%;
  height: 450px;
  grid-gap: 24px;
  overflow: scroll;
`;
const CenterDivType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
  font-size: 24px;
  text-transform: uppercase;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  text-transform: uppercase;
`;

const CenterDivBig = styled(CenterDiv)`
  font-size: 24px;
`;
const CenterDivSmall = styled(CenterDiv)`
  font-size: 12px;
`;

const FaceoffDiv = styled.div`
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr 2fr;
  display: grid;
  height: 100%;
`;
const ShotDiv = styled.div`
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  display: grid;
  height: 120px;
`;
const EventDiv = styled.div`
  height: 120px;
  background-color: ${props => props.color};
  color: ${props => props.textColor};
`;
const EventInfo = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.compact ? "100px 75px 1fr" : "150px 150px 1fr"};
  height: 100%;
`;
const EventControl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const PlayerDiv = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-gap: 14px;
`;
const NumberDiv = styled(CenterDiv)`
  font-size: 50px;
  justify-content: flex-end;
`;
const NameDiv = styled(CenterDivBig)`
  text-align: left;
`;
export const getTitleBasic = event => {
  const {player, type} = event
  if(type === 'SAVE'){
    return 'GOALIE'
  }
  if(type === 'SHOT_AGAINST' || type === 'GOAL_AGAINST'){
    return 'OPPONENT'
  }
  if (!player) {
    return "LATER";
  }
  return (
    <div>
      <div>#{player.number}</div>
      <div>{player.name}</div>
    </div>
  );
};
export const getTitle = event => {
  const {player, type} = event
  if(type === 'SAVE'){
    return 'GOALIE'
  }
  if(type === 'SHOT_AGAINST' || type === 'GOAL_AGAINST'){
    return 'OPPONENT'
  }
  if (!player) {
    return "LATER";
  }
  return (
    <PlayerDiv>
      <NumberDiv>#{player.number}</NumberDiv>
      <NameDiv>{player.name}</NameDiv>
    </PlayerDiv>
  );
};

const getFaceoffEnemy = selectedEvent => {
  const enemy = faceoffEnemy(selectedEvent);
  if (enemy) {
    return `#${enemy}`;
  }
  return "LATER";
};
export const getInfoForSelectedEventType = selectedEvent => {
  if (selectedEvent.type === Events.FACEOFF.type) {
    return (
      <FaceoffDiv>
        <CenterDivBig>{faceoffType(selectedEvent)}</CenterDivBig>
        <CenterDivSmall>against</CenterDivSmall>
        <CenterDivBig>{getFaceoffEnemy(selectedEvent)}</CenterDivBig>
      </FaceoffDiv>
    );
  }
  if (selectedEvent.type === Events.SHOOT.type) {
    return (
      <ShotDiv>
        <CenterDivBig>{shotTypeName(selectedEvent)}</CenterDivBig>
        <CenterDivBig>{shotOutcomeName(selectedEvent)}</CenterDivBig>
      </ShotDiv>
    );
  }
  return <div />;
};

const Event = props => {
  const { event, selectEvent, isSelected, compact } = props;
  const time = toDisplayTime(event);
  const color = isSelected
    ? chroma(getColorForEvent(event)).darken(2.5)
    : getColorForEvent(event);
  return (
    <EventDiv
      onClick={selectEvent}
      color={color}
      textColor={
        chroma.contrast(chroma(color).darken(1), "black") < 4.5
          ? "white"
          : "black"
      }
    >
      <EventInfo compact={compact}>
        <CenterDivType color={chroma(color).darken(1)}>
          {Events[event.type].name}
        </CenterDivType>
        {getInfoForSelectedEventType(event)}
        <div>
          <CenterDivBig>{time}</CenterDivBig>
          <div>{getTitle(event)}</div>
        </div>
      </EventInfo>
    </EventDiv>
  );
};

const EventListComponent = React.memo(props => {
  const { events, sort, compact } = props;

  const { dispatch, state } = useContext(RecordStateContext);
  const { selectedEvent } = state;

  const sortAB = (a, b) => b.realTime - a.realTime;
  const sorted = events.sort((a, b) =>
    sort === "ASC" ? !sortAB(a, b) : sortAB(a, b)
  );
  const selectEvent = event => ev => {
    dispatch({
      type: "SELECTED_EVENT",
      data: event
    });
  };
  const isSelected = event => selectedEvent && event.id === selectedEvent.id;
  return (
    <Root>
      {sorted.map(event => (
        <Event
          compact={compact}
          key={event.id}
          event={event}
          isSelected={isSelected(event)}
          selectEvent={
            isSelected(event) ? selectEvent(null) : selectEvent(event)
          }
        />
      ))}
    </Root>
  );
});
export default EventListComponent;
