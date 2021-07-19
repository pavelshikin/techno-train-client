import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ExitToApp } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter, withRouter } from 'next/router';
import { useAuth } from '../context/auth';
import { ListItem, ListItemIcon, withStyles } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { RedBtn } from '../theme';

const StyledToolbar = withStyles(theme => ({
  root: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.default,
    minHeight: '40px !important'
  }
}))(Toolbar);

const StyledDrawer = withStyles(theme => ({
  root: {
    '& > div': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.default
    }
  }
}))(Drawer);

const StyledListItem = withStyles(theme => ({
  root: {
    '&$selected': {
      backgroundColor: '#403f41'
    },
    '&$selected:hover': {
      backgroundColor: '#4A494B'
    },
    '&:hover': {
      backgroundColor: '#4a494b'
    }
  },
  selected: {}
}))(ListItem);

const StyledListItemIcon = withStyles({
  root: {
    display: 'inline-flex',
    minWidth: 40,
    flexShrink: 0
  }
})(ListItemIcon);

const BackMenuButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#4a494b'
    }
  }
})(IconButton);

const menuItems = [
  { text: 'Главная', href: '/', icon: <HomeRoundedIcon color="primary" /> },
  {
    text: 'Музыка',
    href: '/tracks',
    icon: <MusicNoteRoundedIcon color="primary" />
  },
  {
    text: 'Продукты',
    href: '/products',
    icon: <ShoppingBasketRoundedIcon color="primary" />
  },
  {
    text: 'Заметки',
    href: '/notes',
    icon: <EventNoteRoundedIcon color="primary" />
  },
  {
    text: 'Фильмы/Книги',
    href: '/filmsandbooks',
    icon: <MenuBookRoundedIcon color="primary" />
  }
];

function NavBar({ router }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(
    String(router.pathname)
  );
  const rout = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (href: string, index) => {
    rout.push(href);
    setSelectedIndex(href);
  };

  return (
    <>
      <AppBar position="fixed">
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap color="secondary">
            Techno Train
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            {user ? (
              <div style={{ marginLeft: 'auto' }}>
                <span className="mr-2">{user.username}</span>
                <RedBtn onClick={logout}>
                  <ExitToApp />
                </RedBtn>
              </div>
            ) : (
              ''
            )}
          </div>
        </StyledToolbar>
      </AppBar>
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <div style={{ height: 45 }}>
          <BackMenuButton onClick={handleDrawerClose} color="inherit">
            <ChevronLeftIcon />
          </BackMenuButton>
        </div>
        <List>
          {user ? (
            menuItems.map(({ text, href, icon }, index) => (
              <StyledListItem
                button
                key={index}
                onClick={() => handleListItemClick(href, index)}
                selected={selectedIndex === href}
              >
                <StyledListItemIcon>{icon}</StyledListItemIcon>
                <ListItemText primary={text} />
              </StyledListItem>
            ))
          ) : (
            <>
              <StyledListItem
                button
                onClick={() => handleListItemClick('/auth/login', 20)}
                selected={selectedIndex === '/auth/login'}
              >
                <ListItemText primary={'Вход'} />
              </StyledListItem>
              <StyledListItem
                button
                onClick={() => handleListItemClick('/auth/registration', 21)}
                selected={selectedIndex === '/auth/registration'}
              >
                <ListItemText primary={'Регистрация'} />
              </StyledListItem>
            </>
          )}
        </List>
      </StyledDrawer>
    </>
  );
}

export default withRouter(NavBar);
