import { gql } from "apollo-boost"
export const query = gql`
  {
    team(teamId: "5d43f02a08d1d35013f5b38b") {
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
        number
        id
      }
    }
  }
`
