import React from 'react';
import {Card, Container, Grid, Step, StepLabel, Stepper} from "@material-ui/core"

interface StepWrapperProps {
    activeStep: number

}
const steps= ['Инфо', 'Обложка', 'Аудио']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step key={index} completed={activeStep > index}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justify="center" spacing={3} style={{margin: '50px 0'}}>
                <Grid item xs={12} sm={8}>
                    <Card style={{height: 270}}>
                        {children}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StepWrapper;
