import React from 'react';
import s from '../styles/Tracks.module.scss';
import { ITrack } from '../types/track';
import { Pause, PlayArrow } from '@material-ui/icons';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';
import { RedBtn } from '../theme';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();

  const play = e => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };

  return (
    <div className={s.card} onClick={() => router.push(`/tracks/${track._id}`)}>
      <IconButton onClick={play} color="inherit">
        {!active ? <PlayArrow fontSize="small" /> : <Pause fontSize="small" />}
      </IconButton>
      <img
        src={process.env.apiUrl + track.picture}
        alt="picture"
        width={50}
        height={50}
      />
      <div className={s.title}>
        <span className={s.name}>{track.name}</span>
        <span className={s.artist}>{track.artist}</span>
      </div>
      <div className={s.rightBlock}>
        {active && <div className={s.time}>02:42 / 5:10</div>}
        <RedBtn onClick={e => e.stopPropagation()}>
          <DeleteForeverRoundedIcon fontSize="small" />
        </RedBtn>
      </div>
    </div>
  );
};

export default TrackItem;
