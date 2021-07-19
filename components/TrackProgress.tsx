import React from 'react';
import s from '../styles/Player.module.scss'

interface TrackProgressProps {
    left: number
    right: number
    onChange: (e) => void
}

const TrackVolume: React.FC<TrackProgressProps> = ({left, right, onChange}) => {

    return (
        <div className={s.progressBar}>
            <input type="range" min={0} max={right} value={left} onChange={onChange}/>
            <div style={{minWidth: 58}}>{left} / {right}</div>
        </div>
    );
};

export default TrackVolume;
