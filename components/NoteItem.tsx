import React from 'react'
import s from '../styles/Notes.module.scss'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {RedBtn} from '../theme'


const NoteItem = ({notes}) => {
   return (
     <>
        <div className={s.content}>
           {notes.map((n, i) =>
             <div key={i} className={s.note}>
                <div className={s.head}>
                   <div className={s.title}>{n.title}</div>
                   <div>
                      <RedBtn>
                         <DeleteForeverRoundedIcon fontSize="small"/>
                      </RedBtn>
                   </div>
                </div>
                {
                   n.content ? <div className={s.content}>{n.content}</div> : null
                }
             </div>
           )}
        </div>
     </>
   )
}

export default NoteItem
