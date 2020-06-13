import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback
} from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import useGetMatchVideoInfo from "./hooks/useGetMatchVideoInfo";
import { path } from "ramda";
import { getRealTimeForTime } from "./hooks/useEventFiltering";
import { RecordStateContext } from "../IceRink/RecordState";
import moment from "moment";

export function useInterval(callback, delay) {
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

const query = gql`
  query GameTimeForTime($time: String) {
    gameTimeForTime(time: $time) {
      time
    }
  }
`;
const gameTimeForTime = path(["gameTimeForTime", "time"]);
const GameTimeContainer = props => {
  const { matchId } = props;
  const [time, setTime] = useState(0);
  const min = (60 * 20) - time;
  useInterval(() => {
    setTime(time + 1);
  }, 1000);
  return <div>{moment(min * 1000).format("mm:ss")}</div>;
  /*
  const { loading: l, error: e, data: d } = useGetMatchVideoInfo(matchId);
  const { state } = useContext(RecordStateContext);
  console.log(state.videoPlayerTime);
  const matchVideoInfo = path([ "matchVideoInfo"], d);

  
  
  const [startTime, realTime] = getRealTimeForTime(matchVideoInfo)(
    state.videoPlayerTime
  );

  console.log(
    startTime,
    moment(realTime).toISOString(),
    state.videoPlayerTime,
    state.videoPlayerTime - startTime
  );
  const time = moment(realTime)
    .add(state.videoPlayerTime - startTime, "s")
    .toISOString();
  console.log(time);

  const { loading, error, data } = useQuery(query, {
    variables: {
      time
    }
  });
  if (l && !d) {
    return null;
  }
  if (loading && !data) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error</div>;
  }
  console.log(data);
  const g = gameTimeForTime(data);
  if (g) {
    return <>{g}</>;
  }
  return <div>Error</div>;
  */
};

export default GameTimeContainer;
