import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/Main';
import s from '../../styles/Login.module.scss';
import { Button, TextField } from '@material-ui/core';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/auth';
import api from '../../utils/api';
import { validateEmail } from '../../utils/validateEmail';

const LoginPage = props => {
  const { authenticate, isAuthenticated, user } = useAuth();
  const email = useInput('');
  const password = useInput('');
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [isAuthenticated]);

  const signIn = async () => {
    const data = {
      email: email.value.trim(),
      password: password.value
    };
    if (!data.email || !data.password) {
      setError('Заполните все поля');
      return;
    }
    if (!validateEmail(data.email)) {
      setError('Введите валидный email');
      return;
    }

    await api
      .post('auth/login', data)
      .then(res => {
        if (res.status === 200) {
          authenticate(res.data.Authentication, res.data.Refresh);
        } else {
          setError('Ошибка');
        }
      })
      .catch(function(error) {
        if (error.response.status === 401) {
          setError(error.response.data.message);
        } else {
          setError('Ошибка на сервере');
        }
      })
      .finally(() => {});
  };

  return (
    <MainLayout title={'Вход'}>
      <div className="container">
        <div className={s.box}>
          <h2>{process.env.customKey}</h2>
          <TextField
            {...email}
            label="Email"
            type="email"
            style={{ marginTop: 10 }}
          />
          <TextField
            {...password}
            type="password"
            label="Password"
            style={{ margin: '20px 0 10px' }}
          />
          <div className={s.error}>{error}</div>
          <Button
            color="secondary"
            variant="contained"
            style={{ marginTop: 'auto' }}
            onClick={signIn}
          >
            Войти
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
