import React, {useState} from 'react'
import MainLayout from "../../layouts/Main"
import s from '../../styles/Tracks.module.scss'
import {Button, TextField} from "@material-ui/core"
import {useRouter} from "next/router"
import TrackList from "../../components/TrackList"
import {useTypedSelector} from "../../hooks/useTypedSelector"
import {NextThunkDispatch, wrapper} from "../../store"
import {fetchTracks, searchTracks} from "../../store/actions-creators/track"
import {useDispatch} from "react-redux"
import nookies from "nookies"


const Tracks = ({token}) => {
   const router = useRouter()
   const {tracks, error} = useTypedSelector(state => state.track)
   const [query, setQuery] = useState<string>('')
   const [timer, setTimer] = useState(null)
   const dispatch = useDispatch() as NextThunkDispatch


   const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      if (timer) {
         clearTimeout(timer)
      }
      setTimer(
        setTimeout(async () => {
           await dispatch(await searchTracks(e.target.value, token))
        }, 500)
      )
   }

   if (error) {
      return <MainLayout>
         <div className="container">
            <h1>{error}</h1>
         </div>
      </MainLayout>
   }

   return (
     <>
        <MainLayout title="Список треков">
           <div className="container">
              <div className={s.header}>
                 <h1 className="t-center">Музыка</h1>
                 <Button color="primary" variant="contained"
                         onClick={() => router.push('tracks/create')}>
                    Добавить
                 </Button>
              </div>
              <div className={s.search}>
                 <TextField fullWidth variant="outlined" placeholder={'Поиск'}
                            value={query} onChange={search}/>
              </div>
              <div className={s.content}>
                 <TrackList tracks={tracks}/>
              </div>
           </div>
        </MainLayout>
     </>
   )
}

export default Tracks


export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
   const dispatch = store.dispatch as NextThunkDispatch
   const cookies = nookies.get(ctx);
   const token = cookies.Authentication

   if (token) {
      await dispatch(await fetchTracks(token))

      return {
         props: { token: cookies.Authentication },
      };
   }
})

