import React, {
  useState,
  useRef,
  useImperativeHandle,
  useCallback,
  useEffect
} from "react"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Player from "../Player/Player"
import EventsComponent from "../Events/EventsComponent"

const CenteredBox = ({ children, ...props }) => (
  <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
    {...props}
  >
    {children}
  </Box>
)

const MatchComponent = ({
  data,
  playing,
  setPlaying,
  setSeekTime,
  seekTime,
  setSelectedRows,
  selectedRows,
  clipIndex,
  setClipIndex
}) => {
  const { matchData, eventData } = data
  const playerRef = useRef()
  const eventsRef = useRef()

  useEffect(() => {
    eventsRef.current = selectedRows
  })

  const seekAndPlay = time => {
    setPlaying(true)
    playerRef.current.seekTo(parseFloat(time))
  }
  const seekAndPlayAll = time => {
    const selectedRows = eventsRef.current
    setClipIndex(0)
    const nextTime = selectedRows[0].time
    playerRef.current.seekTo(parseFloat(nextTime))
    setPlaying(true)
  }
  const onClipEnded = clipIndex => {
    const selectedRows = eventsRef.current
    const nextIndex = (clipIndex + 1) % selectedRows.length
    setClipIndex(nextIndex)
    const nextTime = selectedRows[nextIndex].time
    playerRef.current.seekTo(parseFloat(nextTime))
  }

  const clip = selectedRows && selectedRows[clipIndex]
  return (
    <Box
      maxWidth={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      m={2}
      boxShadow={3}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CenteredBox>
            <Player
              clip={clip}
              clipIndex={clipIndex}
              ref={playerRef}
              url={matchData.videoId}
              playing={playing}
              onClipEnded={onClipEnded}
            />
          </CenteredBox>
        </Grid>
        <Grid item xs={12}>
          <CenteredBox>
            <EventsComponent
              seekAndPlay={seekAndPlay}
              onSelectRows={setSelectedRows}
              selectedRows={selectedRows}
              seekAndPlayAll={seekAndPlayAll}
              data={eventData}
            />
          </CenteredBox>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MatchComponent
