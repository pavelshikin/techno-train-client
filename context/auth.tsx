import React, { useState, useContext, useEffect } from 'react';
import nookies from 'nookies';
import api from '../utils/api';
import { useRouter } from 'next/router';
import { IUser } from '../types/user';

const AuthContext = React.createContext({} as {
  user: IUser;
  authenticate: (token: string, refresh: string) => Promise<void>;
  authenticateRefresh: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }
  }, []);

  // force refresh the token every 60 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      authenticateRefresh();
    }, 60 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      authenticateRefresh();
    }
  }, []);

  const authenticateRefresh = async () => {
    try {
      const { data } = await api.get('auth/refresh');
      setToken('Authentication', data);
      const res = await api.post('users/me');
      setUser(res.data);
    } catch (e) {
      console.log(`no token found...`);
      removeTokenAndUser();
    }
  };

  const authenticate = async (token, refresh) => {
    try {
      const res = await api.post('users/me');
      setUser(res.data);
         setToken('Authentication', token);
         setToken('Refresh', refresh);
    } catch (e) {
      console.log(e);
      removeTokenAndUser();
    }
  };

  const logout = async () => {
    try {
      await api.post('auth/logout');
      removeTokenAndUser();
    } catch (e) {
      console.log(e);
    }
  };

  const removeTokenAndUser = () => {
    setUser(null);
    setToken('Authentication');
    setToken('Refresh');
    router.push('/auth/login');
  };

  const setToken = (key: string, token: string = '') => {
    nookies.destroy(null, key);
    nookies.set(null, key, token, { path: '/' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticate,
        authenticateRefresh,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
