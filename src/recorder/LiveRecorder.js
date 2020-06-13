import React  from "react";
import "./App.css";
import IceRink from "./IceRink/IceRinkContainer";
import styled from "styled-components";
import EventListComponent from "./IceRink/EventList/EventListComponent";
import EventEdit from "./IceRink/EventList/EventEdit";
import GameTime from "./common/GameTime";
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
const Root = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const RinkRoot = styled.div`
  display: grid;
  grid-template-columns: 1fr 639px 1fr;
`;
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

function LiveRecorder(props) {
  return <AppContainer {...props}>{rootProps => <NoVideo {...rootProps} />}</AppContainer>;
}

export default LiveRecorder;
