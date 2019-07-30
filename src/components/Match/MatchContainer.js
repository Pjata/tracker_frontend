import React, { useState } from "react"
import MatchComponent from "./MatchComponent"

const data = {
  matchData: {
    id: "2",
    homeTeam: "MAC",
    videoId: "BMVakSczGgk",
    awayTeam: "Jolán",
    date: new Date()
  },
  eventData: [
    {
      time: 305,
      player: "Terbi",
      type: "Shot",
      duration: 2
    },
    {
      time: 505,
      player: "NagyK",
      type: "Block",
      duration: 2
    },
    {
      time: 705,
      player: "Brance",
      type: "Shot",
      duration: 5
    },
    {
      time: 905,
      player: "Bodó",
      type: "Goal",
      duration: 5
    },
    {
      time: 1105,
      player: "Terbi",
      type: "Shot",
      duration: 5
    },
    {
      time: 1205,
      player: "NagyK",
      type: "Block",
      duration: 5
    },
    {
      time: 1305,
      player: "Brance",
      type: "Shot",
      duration: 5
    },
    {
      time: 1405,
      player: "Bodó",
      type: "Goal",
      duration: 5
    }
  ]
}
const MatchContainer = props => {
  const [seekTime, setSeekTime] = useState(1)
  const [playing, setPlaying] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [clipIndex, setClipIndex] = useState(null)
  const stateProps = {
    seekTime,
    playing,
    setSeekTime,
    setPlaying,
    setSelectedRows,
    selectedRows,
    clipIndex,
    setClipIndex
  }
  return <MatchComponent {...stateProps} data={data} />
}

export default MatchContainer
