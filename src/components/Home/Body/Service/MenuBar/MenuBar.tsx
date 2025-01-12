import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabScrollButton from '@mui/material/TabScrollButton';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { useServiceTypesQuery } from '../../../../../queries/serviceTypes';
import { useHomePageContext } from '../../../../../contexts/HomePageContext';

export function MenuBar() {
  const classes = useStyles();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const { serviceTypeRefs } = useHomePageContext();
  const fetchServiceTypesQuery = useServiceTypesQuery();
  const serviceTypes = fetchServiceTypesQuery?.data || [];

  function a11yProps(index: any) {
    return {
      id: `order-menu-tab-${index}`,
      'aria-controls': `order-menu-tabpanel-${index}`,
    };
  }

  function renderScrollButton(props: any) {
    if (props.direction !== 'left' && props.direction !== 'right') {
      return null;
    }
    return (
      <TabScrollButton
        {...props}
        direction={props.direction}
        orientation="horizontal"
        className={props.disabled ? classes.disabledScrollButton : classes.enabledScrollButton}
      />
    );
  }

  return (
    <Paper className={classes.root} elevation={2}>
      <div className={classes.menuBarContainer}>
        <Tabs
          value={false}
          TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}
          ScrollButtonComponent={renderScrollButton}
          variant="scrollable"
          onChange={(_event, newValue) => {
            serviceTypeRefs[newValue].current.scrollIntoView({
              behavior: 'smooth',
            });
            setSelectedMenuIndex(newValue);
          }}
        >
          {serviceTypes.map((serviceType, i) => (
            <Tab
              key={i}
              value={i}
              className={classes.menuBarButton}
              label={
                <Chip
                  label={serviceType.name}
                  color={i === selectedMenuIndex ? 'primary' : 'default'}
                  className={clsx(classes.menuBarItem, i !== selectedMenuIndex && classes.unselectedMenuBarItem)}
                  clickable
                />
              }
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
      </div>
    </Paper>
  );
}
