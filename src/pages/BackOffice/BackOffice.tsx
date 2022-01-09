import { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleIcon from '@material-ui/icons/People';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

import { Drawer } from './Drawer';
import { Header } from './Header';

// TODO: Refactor this
const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="Appointments" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleAltOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Staff" />
    </ListItem>
  </div>
);

export function BackOffice() {
  const [isDrawerOpening, setIsDrawerOpening] = useState(true);

  return (
    <>
      <Header isDrawerOpening={isDrawerOpening} handleDrawerOpen={() => setIsDrawerOpening(true)} />
      <Drawer
        isOpen={isDrawerOpening}
        handleDrawerClose={() => setIsDrawerOpening(false)}
        mainListItems={mainListItems}
      />
    </>
  );
}
