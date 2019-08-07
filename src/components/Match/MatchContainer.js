import React, { useState } from "react"
import MatchComponent from "./MatchComponent"
import { useQuery } from "@apollo/react-hooks"
import { query } from "./query"

const MatchContainer = props => {
  const [seekTime, setSeekTime] = useState(1)
  const [playing, setPlaying] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [clipIndex, setClipIndex] = useState(null)
  const { loading, error, data } = useQuery(query, {
    variables: {
      matchId: props.match.params.id
    },
    pollInterval: 1000
  })
  if (loading) return <p>Loading!</p>
  if (error) return <p>Error!</p>

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
  return <MatchComponent {...stateProps} data={data.match} />
}

export default MatchContainer
