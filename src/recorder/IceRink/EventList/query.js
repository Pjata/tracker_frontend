import { gql } from "apollo-boost";
import { eventFragment } from "../EventList/fragments";
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
