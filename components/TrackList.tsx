import React from 'react';
import {ITrack} from '../types/track';
import s from "../styles/Tracks.module.scss"
import TrackItem from "./TrackItem"

interface TrackListPops {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListPops> = ({tracks}) => {
    return (
        <div className={s.items}>
            {tracks.map(track =>
                <TrackItem key={track._id}
                           track={track}
                />
            )}
        </div>
    );
};

export default TrackList;
