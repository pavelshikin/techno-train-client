import { createTheme, Theme, withStyles } from '@material-ui/core';
import color from './palette.module.scss';
import IconButton from '@material-ui/core/IconButton';

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: color.primary,
      contrastText: color.text
    },
    secondary: {
      main: color.secondary
    },
    background: {
      default: color.bgMain,
      paper: color.bgBody
    }
  }
});

export const RedBtn = withStyles({
  root: {
    color: color.red,
    padding: 0,
    '&:hover': {
      color: color.redHover
    }
  }
})(IconButton);
