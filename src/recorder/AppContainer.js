import React, { useContext, useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import YouTube from "react-youtube";
import IceRink from "./IceRink/IceRinkContainer";
import styled from "styled-components";
import EventListContainer from "./IceRink/EventList/EventListContainer";
import EventListComponent from "./IceRink/EventList/EventListComponent";
import EventEdit from "./IceRink/EventList/EventEdit";
import { ApolloProvider } from "@apollo/react-hooks";
import GameTime from "./common/GameTime";
import client from "./apollo/client";
import moment from "moment";
import { toHHMMSS } from "./common/utility";
import RecordState, { RecordStateContext } from "./IceRink/RecordState";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import MatchInfo from "./IceRink/MatchInfo";

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
const Root = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const RinkRoot = styled.div`
  display: grid;
  grid-template-columns: 1fr 639px 1fr;
`;
const VideoRinkRoot = styled.div`
  display: grid;
  grid-template-columns: 1fr 639px;
`;
const VideoRoot = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const CurrentTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;
const ControlButton = styled.div`
  background-color: ${props => props.color || "#61dafb"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

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
  selectedEvent,
  setSelectedEvent,
  currentTime,
  updateEvent,
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
            <GameTime />
          </Time>
          <IceRink events={events} matchId={matchId} />
        </div>
      </VideoRinkRoot>
      <Events>
        <EventListComponent
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          events={events}
          sort="ASC"
        />
        <Manipulators
          matchId={matchId}
          currentTime={currentTime}
          updateEvent={updateEvent}
          selectedEvent={selectedEvent}
          deleteEvent={deleteEvent}
        />
      </Events>
    </VideoRoot>
  );
};
const NoVideo = ({ events, currentTime, updateEvent, deleteEvent }) => {
  return (
    <Root>
      <RinkRoot>
        <Time>
          <GameTime />
        </Time>
        <IceRink events={events} />
        <div />
      </RinkRoot>
      <Events>
        <EventListComponent sort={"DESC"} events={events} />
        <EventEdit
          currentTime={currentTime}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
        />
      </Events>
    </Root>
  );
};

function App(props) {
  const {
    match: { params },
    children
  } = props;
  const { videoId, matchId } = params;
  const [currentTime, setCurrentTime] = useState(0);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RecordState matchId={params.matchId}>
          <EventListContainer matchId={params.matchId}>
            {(events, deleteEvent) => {
              const rootProps = {
                events,
                currentTime,
                deleteEvent,
                videoId,
                matchId
              };
              return children(rootProps);
            }}
          </EventListContainer>
        </RecordState>
      </div>
    </ApolloProvider>
  );
}

export default App;
