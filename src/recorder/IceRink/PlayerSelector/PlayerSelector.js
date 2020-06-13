import React, { useRef, useState, useContext } from "react"
import styled from "styled-components"
import useOnClickOutside from "../../common/hooks/useOnClickOutside"
import {useTeam} from "./TeamHook/useTeamHook"
import useOnIceLive from "./useOnIceLive/useOnIceLive"
import { RecordStateContext } from "../RecordState";

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const RowSelector = styled.div`
  display: flex;
`
const Row = styled.div`
  box-sizing: content-box;
  padding: 25px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 30px;
  background-color: ${props => props.color || "#2d3f87"};
  color: white;
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`
const Root = styled.div`
  width: 100%;
  height: ${props => `${props.height}px`}
  display: grid;
  grid-gap: 24px;
  grid-template-rows: 1fr 1fr ;
  padding: 24px;
  box-sizing: border-box;
`
const Forwards = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 1fr 1fr;
`
const CenterDiv = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  height: 100%;
  align-items: center;
`
const Defenders = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr 1fr 1fr;
`

const Choice = styled.div`
  background-color: ${props => props.color || "#2d3f87"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 26px;
  user-select: none;
  color: white;
`
const colors = []

const isForward = position =>
  ["CENTER", "LEFT_WING", "RIGHT_WING"].includes(position)
const isDefender = position =>
  ["LEFT_DEFENDER", "RIGHT_DEFENDER"].includes(position)
const getForwards = (players, row) => {
  return players
    .filter(player => isForward(player.position))
    .slice(3 * (row - 1), 3 * row)
}
const getDefenders = (players, row) => {
  return players
    .filter(player => isDefender(player.position))
    .slice(2 * (row - 1), 2 * row)
}

const PlayerChoice = ({ player, onSelect }) => (
  <Choice onClick={onSelect(player)}>
    <div>
      <div>#{player.number}</div>
      <div>{player.name}</div>
    </div>
  </Choice>
)

const Selector = ({ imageSize  }) => {
  const [rowNumber, setRowNumber] = useState(1)
  //const [loadingOnIceLive, errorOnIceLive, dataOnIceLive] = useOnIceLive()
  const [loading,data] = useTeam("5d43f02a08d1d35013f5b38b")
  const {dispatch } = useContext(RecordStateContext);
  const ref = useRef(null)
  const setRow = row => ev => {
    setRowNumber(row)
  }
  useOnClickOutside(ref, () => {
    dispatch({
      type: 'OUTSIDE_CLICK'
    })
  })
  if (loading) {
    return <p>Loading...</p>
  }
  const onSelectPlayer = player => () => {
    dispatch({
      type: 'SELECTED_PLAYER',
      data: player
    })
  }
  const onSelectLater = () => () => {
    dispatch({
      type: 'SELECTED_PLAYER',
      data: {
        id: null
      }
    })
  }
  const players = data.players.sort((a, b) => a.number - b.number)
  return (
    <Container ref={ref}>
      <PlayerChoice
        onSelect={onSelectLater}
        player={{ name: "Later", number: "" }}
      />
      {players.map(player => (
        <PlayerChoice onSelect={onSelectPlayer} player={player} />
      ))}
    </Container>
  )
}

export default Selector
