import React, {useState, useRef} from 'react'
import useComponentSize from '@rehooks/component-size'
import Konva from 'konva';
import { Stage, Layer, Star, Text,Rect,Group } from 'react-konva';


import styled from "styled-components"
const Container = styled.div`
    width: calc(100%);
    background-color: red;
    height: 100%;
    box-sizing: border-box;
`
const Root = styled.div`
    width: calc(100%);
    height: 200px;
    box-sizing: border-box;
    padding: 10px;
`

const formatTime = time => {
    const minutes = Math.floor(time / (60 * 1000))
    const seconds = Math.floor((time % (60 * 1000))/1000)
    const minutesString = minutes.toString(10).padStart(2,'0')
    const secondsString = seconds.toString(10).padStart(2,'0')
    return `${minutesString}:${secondsString}`
}

const TimeBar = props => {
    const [mousePosition,setMousePosition] = useState({})
    const [currentTime,setCurrentTime] = useState(0)
    const [currentTimeMove, setCurrentTimeMove] = useState(false)
    const ref = useRef(null)
    const size = useComponentSize(ref)

    const [visibleTime,setVisibleTime] = useState({start: 0, finish: 21 * 60 * 1000})
    const canvasWidth = size.width -20
    const canvasHeight = size.height-20
    const timeToPosition = time => {
        const timeDelta = visibleTime.finish - visibleTime.start
        const timeRelative = time - visibleTime.start
        const percent = timeRelative / timeDelta
        return percent * canvasWidth
    }
    const getTime = (mousePosition) => {
        const percent = mousePosition.x / canvasWidth
        const timeDelta = visibleTime.finish - visibleTime.start
        const timeClicked = visibleTime.start + percent * timeDelta
        return timeClicked


    }

    const getMousePosition = (event) => {
        return {
            x: event.evt.clientX,
            y: event.evt.clientY
        }
    }
    const onMouseClick = (event) => {
        const mousePos = getMousePosition(event)
        setCurrentTime(getTime(mousePos))
    }
    const getCurrentTimeRect  = () => {
        const position = timeToPosition(currentTime)
        return <Rect
            x={position - 10}
            y={10}
            width={1}
            height={canvasHeight}
            fill={"green"} />

    }
    const getMinuteLines = () => {
        const {start, finish} = visibleTime
        const startMin = Math.ceil(start / (60 * 1000))
        const endMin = Math.floor(finish / (60 * 1000))
        const times = endMin - startMin
        const timeArray = []
        for(let i =0;i<=times;i++){
            timeArray.push(startMin + i * 60 * 1000)
        }
        return timeArray.map(minute => {
            const posX = (timeToPosition(minute))
            return <Group>
                <Text
                    x={posX - 15}
                    y={0}
                    text={minute / (60 * 1000)}
                />
                <Rect
                x={posX - 10}
                y={10}
                width={1}
                height={canvasHeight}
                fill={"black"} />
            </Group>
        })

    }
    const onMouseMove = (ev) => {
        const mousePos = (getMousePosition(ev))
        setMousePosition(mousePos)
        if(currentTimeMove){
            setCurrentTime(getTime(mousePos))
        }
    }
    const onMouseDown = () => {

        console.log('down')
        setCurrentTimeMove(true)
    }
    const onMouseUp = () => {
        console.log('up')
        setCurrentTimeMove(false)
    }
    return <Root ref={ref}>

        {formatTime(currentTime)}
        <Stage width={canvasWidth} height={canvasHeight}>
            <Layer>
                <Rect
                    onMouseMove={onMouseMove}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    x={0}
                    y={0}
                    width={canvasWidth}
                    height={canvasHeight}
                    fill={"red"}
                />
                {getMinuteLines()}
                {getCurrentTimeRect()}
            </Layer>
        </Stage>
    </Root>
}
export default TimeBar
