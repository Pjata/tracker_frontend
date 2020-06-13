import React, { useRef, useContext } from "react";
import styled from "styled-components";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import { RecordStateContext } from "./RecordState";
import useUpdateMatchVideoInfo from "../common/hooks/useUpdateMatchVideoInfo";
import useGetMatchVideoInfo from "../common/hooks/useGetMatchVideoInfo";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  box-sizing: content-box;
`;

const Choice = styled.div`
  background-color: #3e3e66;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 36px;
  user-select: none;
`;

const PeriodStartEdit = ({ imageSize, matchId }) => {
  const { dispatch, state } = useContext(RecordStateContext);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch({
      type: "OUTSIDE_CLICK",
    });
  });
  const updateMachVideoInfo = useUpdateMatchVideoInfo(matchId);
  const [loading, data] = useGetMatchVideoInfo(matchId);

  const setPeriodRealTime = (key) => (ev) => {
    console.log(state.videoPlayerTime);
    if (data) {
      if (!data.matchVideoInfo) {
        updateMachVideoInfo({
          [key]: state.selectedEvent.realTime,
        });
        dispatch({
          type: "FACEOFF_PERIOD_SET",
        });
        return;
      }
      const {
        matchVideoInfo: { __typename, ...matchVideoInfo },
      } = data;
      updateMachVideoInfo({
        ...matchVideoInfo,
        [key]: state.selectedEvent.realTime,
      });
      dispatch({
        type: "FACEOFF_PERIOD_SET",
      });
    }
  };

  return (
    <Root ref={ref} height={imageSize.height}>
      <Choice onClick={setPeriodRealTime("startRealTimeFirstPeriod")}>
        1st period
      </Choice>
      <Choice onClick={setPeriodRealTime("startRealTimeSecondPeriod")}>
        2nd period
      </Choice>
      <Choice onClick={setPeriodRealTime("startRealTimeThirdPeriod")}>
        3rd period
      </Choice>
    </Root>
  );
};

export default PeriodStartEdit;
