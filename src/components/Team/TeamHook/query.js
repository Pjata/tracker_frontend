import { gql } from "apollo-boost"
export const query = gql`
  query Team($teamId: ID!) {
    team(teamId: $teamId) {
      id
      name
      logoUrl
      matches {
        date
        homeTeam {
          name
        }
        awayTeam {
          name
        }
        id
        videoId
      }
      players {
        name
        position
        number
        id
        trackerID
        row
      }
    }
  }
`
