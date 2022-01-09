import { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabScrollButton from '@material-ui/core/TabScrollButton';
import clsx from 'clsx';

import { useHomePageContext } from '../../../../../../contexts/HomePageContext';
import { useServiceTypesQuery } from '../../../../../../queries/serviceTypes';
import { useStyles } from './useStyles';

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
