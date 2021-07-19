import React, { useState } from 'react';
import MainLayout from '../../layouts/Main';
import StepWrapper from '../../components/StepWrapper';
import { Button, Grid, TextField } from '@material-ui/core';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/router';
import api from '../../utils/api';

const Create = props => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput('');
  const artist = useInput('');
  const router = useRouter();

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      api
        .post('tracks', formData)
        .then(res => router.push('/tracks'))
        .catch(e => console.log(e));
    }
  };

  const back = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField
              {...name}
              label="Название трека"
              style={{ marginTop: 10 }}
            />
            <TextField {...artist} label="Автор" style={{ marginTop: 10 }} />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить обложку</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить трек</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Grid container justify="space-between">
          <Button disabled={activeStep === 0} onClick={back}>
            Назад
          </Button>
          <Button onClick={next}>Далее</Button>
        </Grid>
      </div>
    </MainLayout>
  );
};

export default Create;
