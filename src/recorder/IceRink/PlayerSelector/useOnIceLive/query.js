import { gql } from "apollo-boost"
export const query = gql`
  {
    onIceLive {
      player {
        name
        trackerID
        position
        number
        id
      }
    }
  }
`

export default query
