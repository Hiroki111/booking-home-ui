import { Drawer as MuiDrawer, IconButton, Divider, List } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';

import { useStyles } from './useStyles';

interface Props {
  isOpen: boolean;
  handleDrawerClose: () => void;
  mainListItems: JSX.Element;
}

export function Drawer({ isOpen, mainListItems, handleDrawerClose }: Props) {
  const classes = useStyles();

  return (
    <MuiDrawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
      }}
      open={isOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
    </MuiDrawer>
  );
}
