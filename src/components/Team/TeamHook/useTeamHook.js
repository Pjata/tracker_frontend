import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks/lib/index"
import { query } from "./query"
import {
  updatePlayerMutation,
  addPlayerMutation,
  deletePlayerMutation,
  addMatchMutation,
  updateMatchMutation
} from "./mutations"

export const useTeamHook = teamId => {
  const { loading, error, data } = useQuery(query, {
    variables: {
      teamId
    }
  })
  const [updatePlayer] = useMutation(updatePlayerMutation)
  const [addMatch] = useMutation(addMatchMutation)
  const [updateMatch] = useMutation(updateMatchMutation)
  const [addPlayer] = useMutation(addPlayerMutation, {
    update: (cache, { data: { addPlayer } }) => {
      const { team } = cache.readQuery({
        query,
        variables: {
          teamId
        }
      })
      team.players.push(addPlayer)
      cache.writeQuery({
        query,
        data: { team }
      })
    }
  })
  const [deletePlayer] = useMutation(deletePlayerMutation, {
    update: (cache, { data: { deletePlayer } }) => {
      const { team } = cache.readQuery({
        query,
        variables: {
          teamId
        }
      })
      team.players = team.players.filter(player => player.id !== deletePlayer)
      cache.writeQuery({
        query,
        data: { team }
      })
    }
  })
  return [loading, error, data, updatePlayer, addPlayer, deletePlayer, addMatch, updateMatch]
}

export default useTeamHook
