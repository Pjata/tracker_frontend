import React, { useContext, useState, useEffect, useRef } from "react";
import "./App.css";
import IceRink from "./IceRink/IceRinkContainer";
import styled from "styled-components";
import EventListComponent from "./IceRink/EventList/EventListComponent";
import EventEdit from "./IceRink/EventList/EventEdit";
import GameTime from "./common/GameTime";
import RecordState, { RecordStateContext } from "./IceRink/RecordState";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import MatchInfo from "./IceRink/MatchInfo";
import AppContainer from "./AppContainer";

const Time = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 900;
`;
const Events = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;
const VideoRinkRoot = styled.div`
  display: grid;
  grid-template-columns: 1fr 639px;
`;
const VideoRoot = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 400px 1fr;
  grid-gap: 24px;
`;


const Manipulators = props => {
  const { state } = useContext(RecordStateContext);
  const { selectedEvent } = state;
  if (selectedEvent) {
    return <EventEdit {...props} />;
  }
  return <MatchInfo {...props} />;
};
const WithVideo = ({
  events,
  currentTime,
  deleteEvent,
  videoId,
  matchId
}) => {
  return (
    <VideoRoot>
      <VideoRinkRoot>
        <VideoPlayer videoId={videoId} matchId={matchId} />
        <div>
          <Time>
            <GameTime matchId={matchId} />
          </Time>
          <IceRink events={events} matchId={matchId} />
        </div>
      </VideoRinkRoot>
      <Events>
        <EventListComponent
          events={events}
          sort='ASC'
        />
        <Manipulators
          matchId={matchId}
          currentTime={currentTime}
          deleteEvent={deleteEvent}
        />
      </Events>
    </VideoRoot>
  );
};

function EditorWithVideo(props) {
  return <AppContainer {...props}>{rootProps => <WithVideo {...rootProps} />}</AppContainer>;
}

export default EditorWithVideo;
