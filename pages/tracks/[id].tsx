import React, { useState } from 'react';
import MainLayout from '../../layouts/Main';
import { Button, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import s from '../../styles/Tracks.module.scss';
import { useInput } from '../../hooks/useInput';
import { ITrack } from '../../types/track';
import nookies from 'nookies';
import api from '../../utils/api';

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const res = await api.post('tracks/comment', {
        trackId: track._id,
        username: username.value,
        text: text.value
      });
      setTrack({ ...track, comments: [...track.comments, res.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={`${track.artist} - ${track.name}`}
      keywords={track.artist + ',' + track.name}
    >
      <div className="container">
        <div className={s.header}>
          <Button variant="outlined" onClick={() => router.push('/tracks')}>
            К списку
          </Button>
        </div>
        <div className={s.content}>
          <div className={s.pageHead}>
            <div className={s.image}>
              <img
                src={process.env.apiUrl + track.picture}
                alt="picture"
                width={250}
                height={250}
              />
            </div>
            <div className={s.pageContent}>
              <h1>Название - {track.name}</h1>
              <h1>Исполнитель - {track.artist}</h1>
              <h2>Прослушиваний - {track.listens}</h2>
            </div>
          </div>
          <div>
            <h1>Комментарии</h1>
            <div className="my-1">
              <TextField
                {...username}
                label="Ваше имя"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className="my-1">
              <TextField
                {...text}
                label="Комментарий"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            </div>
            <div className="my-1">
              <Button onClick={addComment} color="primary" variant="contained">
                Отправить
              </Button>
            </div>
          </div>
          <div className="mt-2">
            {track.comments.map(comment => (
              <div className={s.comment} key={comment._id}>
                <div className={s.commentAuthor}>
                  Автор - {comment.username}
                </div>
                <div>{comment.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookies = nookies.get(ctx);
  const token = cookies.Authentication;

  if (token) {
    const res = await api.get('tracks/' + ctx.params.id, {
      headers: {
        Cookie: `Authentication=${token}`
      }
    });

    return {
      props: {
        serverTrack: res.data
      }
    };
  }
};
