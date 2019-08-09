import React, { useState } from "react"
import TeamComponent from "./TeamComponent"
import useTeamHook from "./TeamHook/useTeamHook"
const getPlayerInput = playerInput => ({
  name: playerInput.name,
  number: Number(playerInput.number),
  trackerID: playerInput.trackerID,
  position: playerInput.position
})
const TeamContainer = props => {
  const [activeModule, setActiveModule] = useState(0)
  console.log(props.match.params.id)
  const [
    loading,
    error,
    data,
    updatePlayer,
    addPlayer,
    deletePlayer
  ] = useTeamHook(props.match.params.id)
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
