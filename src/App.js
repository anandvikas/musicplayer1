import { useState } from 'react'
import SongList from "./components/songlist/songlist";
import Player from "./components/player/player";

const App = () => {
  const [state1, update1] = useState(<Player index={1} />)
  
  
  let playThis = (index) => {
    // console.log(index)
    update1(<Player index={index} />)
    // let audio = document.getElementById('audio')
    // audio.play()
  }
  return (
    <>
      
      <SongList playThis={playThis} />
      {state1}
    </>
  )
}
export default App;
