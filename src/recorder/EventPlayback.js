import React, { useContext, useState, useEffect, useRef } from "react";
import "./App.css";
import styled from "styled-components";
import EventListComponent from "./IceRink/EventList/EventListComponent";
import GameTime from "./common/GameTime";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import AppContainer from "./AppContainer";
import IceRinkPlaybackSvg from "./IceRink/IceRinkPlaybackSvg";
import PlayerFilter from "./common/Filters/PlayerFilter";
import produce from "immer";
import PeriodFilter from "./common/Filters/PeriodFilter";
import EventFilter from "./common/Filters/EventFilter";
import useEventFiltering from "./common/hooks/useEventFiltering";
import ZoneFilter from "./common/Filters/ZoneFilter";

const Events = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 24px;
`;
const VideoRinkRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const VideoRoot = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 500px;
`;

const WatcherRoot = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const FiltersAndIceRink = styled.div`
  height: 100%;
  & > div {
    margin: 24px 0px;
  }
`;

const WithVideo = ({ events, videoId, matchId }) => {
  const [filters, setFilters] = useState({
    selectedPlayers: [],
    selectedPeriods: [],
    selectedEvents: []
  });

  const eventsFiltered = useEventFiltering({
    events,
    matchId,
    filters
  });

  const onChange = key => value => {
    setFilters(
      produce(filters, draft => {
        draft[key] = value;
      })
    );
  };

  return (
    <VideoRoot>
      <WatcherRoot>
        <VideoRinkRoot>
          <VideoPlayer videoId={videoId} matchId={matchId} />
        </VideoRinkRoot>
        <Events>
          <EventListComponent
            compact={true}
            events={eventsFiltered}
            sort="ASC"
          />
          <FiltersAndIceRink>
            <PeriodFilter
              selectedPeriods={filters.selectedPeriods}
              onChange={onChange("selectedPeriods")}
            />
            <PlayerFilter
              selectedPlayers={filters.selectedPlayers}
              onChange={onChange("selectedPlayers")}
            />
            <EventFilter
              selectedEvents={filters.selectedEvents}
              onChange={onChange("selectedEvents")}
            />
            <ZoneFilter
              selectedEvents={filters.selectedZones}
              onChange={onChange("selectedZones")}
            />
          </FiltersAndIceRink>
        </Events>
      </WatcherRoot>
      <IceRinkPlaybackSvg vertical events={eventsFiltered} />
    </VideoRoot>
  );
};

function EventPlayback(props) {
  return (
    <AppContainer {...props}>
      {rootProps => <WithVideo {...rootProps} />}
    </AppContainer>
  );
}

export default EventPlayback;
