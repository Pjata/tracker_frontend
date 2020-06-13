import React,{useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import TimeBar from "./TimeBar/TimeBar";

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function App() {
    const [time, setTime] = useState(0)
    const onCallback = () => {
    }
    useInterval(onCallback,200)
    const onReady = (event) => {
    }
    return <div >
        <TimeBar/>
    </div>
}

export default App;
