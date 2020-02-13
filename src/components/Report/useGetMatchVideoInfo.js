import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
const query = gql`
  query MatchVideoInfo($matchId: ID!) {
  match(matchId: $matchId) {
      matchVideoInfo {
        startTimeFirstPeriod
        startTimeSecondPeriod
        startTimeThirdPeriod
        startRealTimeFirstPeriod
        startRealTimeSecondPeriod
        startRealTimeThirdPeriod
      }
    }
  }
`;
const useGetMatchVideoInfo = matchId => {
  const { loading, error, data } = useQuery(query, {
    variables: {
      matchId
    }
  });
  console.log(loading, error, data)
  return { loading, error, data };
};

export default useGetMatchVideoInfo;
