import { useEffect, useState } from "react";
import Data from "../../assets/data";
import './player.css'
import spell from './spell.wav'

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
    // CODE FOR VISUALISER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // let audiosource;
    // let analyser;
    // const playVisualiser = () => {
    //     const canvas1 = document.getElementById('canvas1')
    //     canvas1.height = window.innerHeight
    //     canvas1.width = window.innerWidth
    //     const ctx = canvas1.getContext('2d')

    //     const audio = document.getElementById('audio');  
    //     // audio.crossOrigin = 'anonymous'      
    //     console.log(audio.files)
        
    //     const audioContext = new AudioContext();        
    //     audiosource = audioContext.createMediaElementSource(audio);
    //     analyser = audioContext.createAnalyser();
    //     analyser = audioContext.createAnalyser();
    //     audiosource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 128;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);
    //     const barWidth = 3;
    //     let barHeight;
    //     let x;
    //     function animate() {
    //         x = 0;
    //         ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    //         analyser.getByteFrequencyData(dataArray);
    //         // drawVisualiser(canvas1, ctx, bufferLength, x, barWidth, barHeight, dataArray)
    //         for (let i = 0; i < bufferLength; i++) {
    //             barHeight = dataArray[i] * 1 + 10;
    //             ctx.save();
    //             ctx.translate(canvas1.width / 2, canvas1.height / 2);
    //             ctx.rotate(i * Math.PI * 5 / bufferLength);
    //             let hue = i * 5;
    //             ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    //             ctx.fillRect(0, 0, barWidth, barHeight);
    //             x += barWidth;
    //             ctx.restore();
    //         }

    //         requestAnimationFrame(animate)
    //     }
    //     animate()
    // }
    // function drawVisualiser(canvas1, ctx, bufferLength, x, barWidth, barHeight, dataArray) {
    //     for (let i = 0; i < bufferLength; i++) {
    //         barHeight = dataArray[i] * 1 + 10;
    //         ctx.save();
    //         ctx.translate(canvas1.width / 2, canvas1.height / 2);
    //         ctx.rotate(i * Math.PI * 5 / bufferLength);
    //         let hue = i * 5;
    //         ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    //         ctx.fillRect(0, 0, barWidth, barHeight);
    //         x += barWidth;
    //         ctx.restore();
    //     }
    // }
    return (
        <>
            <div className='imgDiv'><img src={Data[ind].image} alt='cover image' /></div>
            <div className='playerCon'>
                <h1 className="sTitle"><marquee>{Data[ind].name}</marquee></h1>
                {/* <div className="visualiserCon"><canvas id="canvas1"></canvas></div> */}
                <div className='playerDiv'>
                    <audio src={Data[ind].audio} id='audio' autoPlay onTimeUpdate={timeUpdated} onEnded={skipNext} ></audio>
                    {/* <audio src={spell} id='audio' autoPlay onTimeUpdate={timeUpdated} onEnded={skipNext} onPlay={playVisualiser}></audio> */}
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
