import {PlayArrow, Pause, VolumeUp} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'
import React, {useEffect} from 'react'
import s from '../styles/Player.module.scss'
import TrackProgress from "./TrackProgress"
import {useTypedSelector} from "../hooks/useTypedSelector"
import {useActions} from "../hooks/useActions"
import TrackVolume from "./TrackProgress"

let audio

const Player = (props) => {
   const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player)
   const {playTrack, pauseTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()

   useEffect(() => {
      if (!audio) {
         audio = new Audio()
      } else {
         setAudio()
         play()
      }
   }, [active])

   const setAudio = () => {
      if (active) {
         audio.src = `http://localhost:5000/` + active.audio
         audio.volume = volume / 100
         audio.onloadedmetadata = () => {
            setDuration(Math.ceil(Number(audio.duration)))
         }
         audio.ontimeupdate = () => {
            setCurrentTime(Math.ceil(audio.currentTime))
         }
      }
   }

   const play = () => {
      if (pause) {
         playTrack()
         audio.play()
      } else {
         pauseTrack()
         audio.pause()
      }
   }

   const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.volume = Number(e.target.value) / 100
      setVolume(Number(e.target.value))
   }

   const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.currentTime = Number(e.target.value)
      setCurrentTime(Number(e.target.value))
   }

   if (!active) {
      return null
   }

   return (
     <div className={s.container}>
        <div className={s.btn}>
           <IconButton onClick={play}>
              {pause
                ? <PlayArrow fontSize="small"/>
                : <Pause fontSize="small"/>
              }
           </IconButton>
        </div>
        <div className={s.title}>
            <div className={s.titleBox}>
                <span className={s.name}>{active?.name}</span>
                <span className={s.artist}>{active?.artist}</span>
            </div>

        </div>
         <div className={s.bar}>
             <div className={s.titleBar}>
                 <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
                 <VolumeUp style={{marginLeft: 'auto'}}/>
                 <TrackVolume left={volume} right={100} onChange={changeVolume}/>
             </div>
         </div>
     </div>
   )
}

export default Player
