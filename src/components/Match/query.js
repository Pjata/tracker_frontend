import { gql } from "apollo-boost"
export const query = gql`
  query Match($matchId: ID!) {
    match(matchId: $matchId) {
      id
      videoId
      events {
        id
        time
        time
        player {
          name
        }
        position {
          x
          y
        }
        type
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
`
