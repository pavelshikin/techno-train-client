import React from 'react';
import s from '../styles/Player.module.scss'

interface TrackProgressProps {
    left: number
    right: number
    onChange: (e) => void
}

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange}) => {

    const fmtMSS = (s: number ): string =>{
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
    }

    return (
        <div className={s.progressBar}>
            <input type="range" min={0} max={right} value={left} onChange={onChange}/>
            <div style={{minWidth: 58}}>{fmtMSS(left)} / {fmtMSS(right)}</div>
        </div>
    );
};

export default TrackProgress;
