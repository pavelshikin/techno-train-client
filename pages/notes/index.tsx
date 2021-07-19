import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/Main';
import api from '../../utils/api';
import { NextThunkDispatch, wrapper } from '../../store';
import nookies from 'nookies';
import { postsByCategory } from '../../utils/postsByCategory';
import { useAuth } from '../../context/auth';
import NoteItem from '../../components/NoteItem';

const NotesPage = ({ serverPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [owner, setOwner] = useState(null);
  // const [totalCount, setTotalCount] = useState(serverTotalCount)
  const { user } = useAuth();
  const notes = postsByCategory(serverPosts, 'notes');

  /*useEffect(() => {
      if (fetching) {
         api.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
           .then(res => {
              setPhotos([...photos, ...res.data])
              setCurrentPage(prevState => prevState + 1)
              setTotalCount(res.headers['x-total-count'])
           })
           .finally(() => setFetching(false))
      }
   }, [fetching])

   useEffect(() => {
      document.addEventListener('scroll', scrollHandler)
      return function () {
         document.removeEventListener('scroll', scrollHandler)
      }
   }, [])

   const scrollHandler = (e) => {
      if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
        && photos.length < totalCount) {
         setFetching(true)
      }
   }*/

  return (
    <MainLayout title={'Заметки'}>
      <div className="container">
        <NoteItem notes={notes} />
      </div>
    </MainLayout>
  );
};

export default NotesPage;

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ctx => {
    const dispatch = store.dispatch as NextThunkDispatch;
    const cookies = nookies.get(ctx);
    const token = cookies.Authentication;

    if (token) {
      const res = await api.get('posts/me', {
        headers: {
          Cookie: `Authentication=${token}`
        }
      });

      return {
        props: {
          serverPosts: res.data
        }
      };
    }
  }
);
