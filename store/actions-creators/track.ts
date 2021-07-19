import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes } from '../../types/track';
import api from '../../utils/api';

export const fetchTracks = (token: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await api.get('tracks', {
        headers: {
          Cookie: `Authentication=${token}`
        }
      });
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS,
        payload: response.data
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Ошибка загрузки треков'
      });
    }
  };
};

export const searchTracks = (query: string, token: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await api.get('tracks/search?query=' + query, {
        headers: {
          Cookie: `Authentication=${token}`
        }
      });
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS,
        payload: response.data
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Ошибка загрузки треков'
      });
    }
  };
};
