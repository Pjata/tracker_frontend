import { gql } from "apollo-boost"
export const updatePlayerMutation = gql`
  mutation UpdatePlayer($playerId: ID!, $playerInput: PlayerInput!) {
    updatePlayer(playerId: $playerId, playerInput: $playerInput) {
      id
      name
      number
      trackerID
      position
      row
    }
  }
`
export const addPlayerMutation = gql`
  mutation addPlayer($teamId: ID!, $playerInput: PlayerInput!) {
    addPlayer(teamId: $teamId, playerInput: $playerInput) {
      id
      name
      number
      trackerID
      position
      row
    }
  }
`
export const deletePlayerMutation = gql`
  mutation deletePlayer($playerId: ID!) {
    deletePlayer(playerId: $playerId)
  }
`
