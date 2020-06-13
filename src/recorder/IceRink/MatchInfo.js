import React, { useContext } from "react";
import styled from "styled-components";
import { RecordStateContext } from "./RecordState";
import { o } from "ramda";
import useUpdateMatchVideoInfo from "../common/hooks/useUpdateMatchVideoInfo";
import useGetMatchVideoInfo from "../common/hooks/useGetMatchVideoInfo";

const Root = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  box-sizing: content-box;
`;

const Choice = styled.div`
  background-color: #7780c1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 32px;
  user-select: none;
`;

const MatchInfo = ({ matchId }) => {
  const updateMachVideoInfo = useUpdateMatchVideoInfo(matchId);
  const [ loading,  data] = useGetMatchVideoInfo(matchId);
  const { dispatch, state } = useContext(RecordStateContext);

  const setPeriod = key => () => {
    console.log(state.videoPlayerTime);
    if (data) {
      if (!data.matchVideoInfo) {
        updateMachVideoInfo({
          [key]: Math.floor(state.videoPlayerTime)
        });
        return
      }
      const {
          matchVideoInfo: { __typename, ...matchVideoInfo }
      } = data;
      updateMachVideoInfo({
        ...matchVideoInfo,

        [key]: Math.floor(state.videoPlayerTime)
      });
    }
  };

  return (
    <Root>
      <Choice onClick={setPeriod("startTimeFirstPeriod")}>1st puck drop</Choice>
      <Choice onClick={setPeriod("startTimeSecondPeriod")}>
        2nd puck drop
      </Choice>
      <Choice onClick={setPeriod("startTimeThirdPeriod")}>3rd puck drop</Choice>
    </Root>
  );
};

export default MatchInfo;
