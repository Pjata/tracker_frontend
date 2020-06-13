import React, { useRef, useContext, useEffect, useState } from "react";

import ReactPlayer from "react-player";
import useGetMatchVideoInfo from "../common/hooks/useGetMatchVideoInfo";
import { path } from "ramda";
import { RecordStateContext } from "../IceRink/RecordState";
import Events from "../IceRink/Events";
const getEventBasedOffset = (type) => {
  if (type === Events.SHOOT.type) {
    return -5;
  }
  return -5;
};

const VideoPlayer = (props) => {
  const { videoId, matchId } = props;

  const ref = useRef(null);
  const [loading, data] = useGetMatchVideoInfo(matchId);
  const { state, dispatch } = useContext(RecordStateContext);
  const [playing, setPlaying] = useState(false);
  const { selectedEvent } = state;

  const matchVideoInfo = path(["matchVideoInfo"], data);
  const decoded = `https://www.youtube.com/watch?v=${videoId}`;

  console.log(matchVideoInfo);
  useEffect(() => {
    if (!selectedEvent || !matchVideoInfo) {
      return;
    }
    const { realTime : realTimeFirebase, type } = selectedEvent;
    const {
      startTimeFirstPeriod,
      startTimeSecondPeriod,
      startTimeThirdPeriod,
      startRealTimeFirstPeriod,
      startRealTimeSecondPeriod,
      startRealTimeThirdPeriod,
    } = matchVideoInfo;

    const startTimes = [
      startTimeFirstPeriod,
      startTimeSecondPeriod,
      startTimeThirdPeriod,
    ];
    const startRealTimes = [
      startRealTimeFirstPeriod.toDate(),
      startRealTimeSecondPeriod.toDate(),
      startRealTimeThirdPeriod.toDate(),
    ];
    const realTime = realTimeFirebase.toDate()

    const getVideoTime = () => {
      const getBetweenTime = () => {
        if (realTime < startRealTimes[1]) {
          return { startTime: startTimes[0], startRealTime: startRealTimes[0] };
        }
        if (realTime < startRealTimes[2]) {
          return { startTime: startTimes[1], startRealTime: startRealTimes[1] };
        }
        return { startTime: startTimes[2], startRealTime: startRealTimes[2] };
      };
      const { startTime, startRealTime } = getBetweenTime();

      const offSet = Math.floor((realTime - startRealTime) / 1000.0);
      const eventBasedOffset = getEventBasedOffset(type);
      return startTime + offSet + eventBasedOffset;
    };

    const time = getVideoTime();
    console.log(time)

    ref.current.seekTo(time);
    setPlaying(true);
  }, [matchVideoInfo, selectedEvent]);

  const handleProgress = (state) => {
    dispatch({
      type: "VIDEO_PLAYER_TIME",
      data: state.playedSeconds,
    });
    // We only want to update time slider if we are not currently seeking
  };

  return (
    <ReactPlayer
      height="100%"
      width="100%"
      ref={ref}
      url={decoded}
      playing={playing}
      onProgress={handleProgress}
      controls={true}
    />
  );
};

export default VideoPlayer;
