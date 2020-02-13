import { gql } from "apollo-boost";
export const eventFragment = gql`
  fragment EventFragment on Event {
      id
      time
      realTime
      type
      position {
        x
        y
      }
      player {
        id
        name
        number
      }
      eventData {
        ... on FaceoffEventData {
          faceoffType
          enemy
        }
        ... on ShotEventData {
          shotType
          shotOutcome
          shotPosition {
            x
            y
          }
        }
      }
    }
`
const query = gql`
  query MatchEvents($matchId: ID!) {
    match(matchId: $matchId) {
      id
      matchVideoInfo {
        startTimeFirstPeriod
        startTimeSecondPeriod
        startTimeThirdPeriod
        startRealTimeFirstPeriod
        startRealTimeSecondPeriod
        startRealTimeThirdPeriod
      }
      events {
        ...EventFragment
      }
      date
      homeTeam {
        name
      }
      awayTeam {
        name
      }
    }
  }
  ${eventFragment}
`;
export default query;