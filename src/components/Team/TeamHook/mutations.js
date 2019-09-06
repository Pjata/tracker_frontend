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

export const addMatchMutation = gql`
  mutation  addMatch($homeTeamId: ID!, $awayTeamId: ID!,$videoId: String,$date: Date) {
    addMatch(homeTeamId: $homeTeamId, awayTeamId: $awayTeamId, videoId: $videoId, date: $date) {
      homeTeam {
        name
      }
      awayTeam {
        name
      }
      id
      videoId
      date
    }
  }
`

export const updateMatchMutation = gql`
  mutation  updateMatch($matchId: ID!, $videoId: String,$date: Date) {
    updateMatch(matchId: $matchId, videoId: $videoId, date: $date) {
      homeTeam {
        name
      }
      awayTeam {
        name
      }
      id
      videoId
      date
    }
  }
`