import React, { useState } from "react"
import TeamComponent from "./TeamComponent"
import { useQuery, useMutation } from "@apollo/react-hooks/lib/index"
import { query } from "./query"
import {
  updatePlayerMutation,
  addPlayerMutation,
  deletePlayerMutation
} from "./mutations"
const getPlayerInput = playerInput => ({
  name: playerInput.name,
  number: Number(playerInput.number),
  trackerID: playerInput.trackerID
})
const TeamContainer = props => {
  const { loading, error, data } = useQuery(query, {
    variables: {
      teamId: props.match.params.id
    }
  })
  const [activeModule, setActiveModule] = useState(0)
  const [updatePlayer] = useMutation(updatePlayerMutation)
  const [addPlayer] = useMutation(addPlayerMutation, {
    update: (cache, { data: { addPlayer } }) => {
      const { team } = cache.readQuery({ query })
      team.players.push(addPlayer)
      cache.writeQuery({
        query,
        data: { team }
      })
    }
  })
  const [deletePlayer] = useMutation(deletePlayerMutation, {
    update: (cache, { data: { deletePlayer } }) => {
      const { team } = cache.readQuery({ query })
      team.players = team.players.filter(player => player.id !== deletePlayer)
      cache.writeQuery({
        query,
        data: { team }
      })
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  const { team } = data
  const onPlayerUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      const { id, ...playerInput } = newData
      updatePlayer({
        variables: {
          playerId: id,
          playerInput: getPlayerInput(playerInput)
        }
      })
      resolve()
    })
  }
  const onPlayerAdd = newData => {
    return new Promise((resolve, reject) => {
      const { id, ...playerInput } = newData
      addPlayer({
        variables: {
          teamId: team.id,
          playerInput: {
            ...getPlayerInput(playerInput)
          }
        }
      })
      resolve()
    })
  }
  const onPlayerDelete = newData => {
    return new Promise((resolve, reject) => {
      const { id } = newData
      deletePlayer({
        variables: {
          playerId: id
        }
      })
      resolve()
    })
  }
  return (
    <TeamComponent
      data={team}
      activeModule={activeModule}
      setActiveModule={setActiveModule}
      onPlayerUpdate={onPlayerUpdate}
      onPlayerAdd={onPlayerAdd}
      onPlayerDelete={onPlayerDelete}
    />
  )
}

export default TeamContainer
