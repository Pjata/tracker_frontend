import React, {
  useRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from "react"
import ReactPlayer from "react-player"

const youtubeUrl = strings => `https://www.youtube.com/watch?v=${strings}`

const Player = React.forwardRef(
  ({ url, time, playing, clipIndex, clip, onClipEnded }, ref) => {
    const playerRef = useRef(null)
    const clipIndexRef = useRef()
    const clipRef = useRef()
    useEffect(() => {
      clipIndexRef.current = clipIndex
      clipRef.current = clip
    })
    useImperativeHandle(ref, () => playerRef.current)

    const onProgress = data => {
      const { playedSeconds } = data
      if (clipRef.current) {
        const { time, duration } = clipRef.current
        if (playedSeconds > time + duration) {
          onClipEnded(clipIndexRef.current)
        }
      }
    }
    return (
      <ReactPlayer
        onProgress={onProgress}
        playing={playing}
        ref={playerRef}
        url={youtubeUrl(url)}
        youtubeConfig={{ playerVars: { showinfo: 1 } }}
        controls
      />
    )
  }
)

export default Player
