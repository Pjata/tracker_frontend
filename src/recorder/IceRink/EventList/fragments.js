import { gql } from "apollo-boost"
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