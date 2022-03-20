import { useEffect, useState } from "react";
import Data from "../../assets/data";
const Player = (props) => {
    const [ind, updateInd] = useState(props.index)
    const [time1, Utime1] = useState('0:00')
    const [time2, Utime2] = useState('0:00')
    const [pausePlay, uPausePlay] = useState("fas fa-play")
    useEffect(() => {
        updateInd(props.index)
        uPausePlay("fas fa-pause")
    }, [props.index])
    // console.log(ind)

    // FOR PLAY PAUSE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    function playPause() {
        let audio = document.getElementById('audio')
        if (audio.paused === false) {
            audio.pause()
            uPausePlay("fas fa-play")
        } else if (audio.paused === true) {
            audio.play()
            uPausePlay("fas fa-pause")
        }
    }
    // FOR SKIP NEXT AND PREVIOUS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    
    const skipPrev = () => {
        if (ind > 0) {
            updateInd(ind - 1)
        } else {
            updateInd(Data.length - 1)
        }
        uPausePlay("fas fa-pause")
    }
    const skipNext = () => {
        if (ind < Data.length - 1) {
            updateInd(ind + 1)
        } else {
            updateInd(0)
        }
        uPausePlay("fas fa-pause")
    }

    // THIS WILL PROVIDE TIME IN REQUIRED FORMET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const getFormettedTime = (t) => {
        let min = Math.floor(t / 60)
        let sec = t - (min * 60)
        if (sec < 10) {
            sec = '0' + sec
        }
        return `${min}:${sec}`
    }
    // FOR PROGRESS BAR>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    let td;
    const timeUpdated = (event) => {
        // console.log(event)
        let { currentTime, duration } = event.target
        td = duration;
        // console.log(currentTime, duration)
        let timePC = Math.floor((currentTime / duration) * 100)
        // console.log(timePC)
        document.getElementById('progColor').style.width = `${timePC}%`

        // for time display >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        let ct = Math.floor(currentTime)
        let dt = Math.floor(duration)
        // console.log(ct,dt)
        Utime1(getFormettedTime(ct))
        Utime2(getFormettedTime(dt))
    }
    const bringTo = (event) => {
        // console.log(event)
        let bringPC = Math.round(Math.abs((event.nativeEvent.offsetX / event.target.clientWidth) * 100))
        // console.log(bringPC)
        document.getElementById('progColor').style.width = `${bringPC}%`
        let newtime = (bringPC / 100) * td
        // console.log(newtime, td)
        document.getElementById('audio').currentTime = newtime
    }

    return (
        <>
            <div className='imgDiv'><img src={Data[ind].image} alt='cover image'/></div>
            <div className='playerCon'>
                <h1 className="sTitle"><marquee>{Data[ind].name}</marquee></h1>
                <div className='playerDiv'>
                    <audio src={Data[ind].audio} id='audio' autoPlay onTimeUpdate={timeUpdated} onEnded={skipNext}></audio>
                    <div className="controls">
                        <div className="progress">
                            <div id="timeL">{time1}</div>
                            <div className="progDiv">
                                <div id="progColor"></div>
                                <div id="progCover" onClick={(event) => { bringTo(event) }}></div>
                            </div>
                            <div id="timeR">{time2}</div>
                        </div>
                        <div className="btns"><i className="fas fa-step-backward" onClick={skipPrev}></i><i className={pausePlay} onClick={playPause}></i><i className="fas fa-step-forward" onClick={skipNext}></i></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Player;
