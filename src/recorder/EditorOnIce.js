import React, { useContext, useState, useEffect, useRef } from "react";
import "./App.css";
import styled from "styled-components";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import AppContainer from "./AppContainer";
import { DragDropContext } from "react-beautiful-dnd";
import { usePlayerOnIce } from "../common/hooks/usePlayerOnIce";

const VideoRinkRoot = styled.div`
  display: grid;
  grid-template-rows: 400px 1fr;
`;
const VideoRoot = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 639px 1fr;
  grid-gap: 24px;
`;

const WithVideo = ({ events, currentTime, deleteEvent, videoId, matchId }) => {
  const { OnIce, OnBench, onDragEnd } = usePlayerOnIce();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <VideoRoot>
        <VideoRinkRoot>
          <VideoPlayer videoId={videoId} matchId={matchId} />
          <OnIce />
        </VideoRinkRoot>
        <OnBench />
      </VideoRoot>
    </DragDropContext>
  );
};

function EditorWithVideo(props) {
  return (
    <AppContainer {...props}>
      {(rootProps) => <WithVideo {...rootProps} />}
    </AppContainer>
  );
}

export default EditorWithVideo;
