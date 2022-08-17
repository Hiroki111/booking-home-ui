import { useState } from 'react';
import { Tabs, Tab, Chip } from '@material-ui/core';

import { useHomePageContext } from '../../../../../contexts/HomePageContext';
import { useServiceTypesQuery } from '../../../../../queries/serviceTypes';
import { useStyles } from './useStyles';

export function ServiceTabs() {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const fetchServiceTypesQuery = useServiceTypesQuery();
  const { serviceTypeRefs } = useHomePageContext();
  const serviceTypes = fetchServiceTypesQuery?.data || [];

  function a11yProps(index: any) {
    return {
      id: `header-menu-tab-${index}`,
      'aria-controls': `header-menu-tabpanel-${index}`,
    };
  }

  return (
    <Tabs
      value={false}
      TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}
      onChange={(_event, newValue) => {
        serviceTypeRefs[newValue].current.scrollIntoView({
          behavior: 'smooth',
        });
        setTabIndex(newValue);
      }}
      variant="scrollable"
      scrollButtons="on"
    >
      {serviceTypes.map((serviceType, i) => (
        <Tab
          key={i}
          value={i}
          classes={{ root: classes.menuTab }}
          label={
            <Chip
              label={serviceType.name}
              classes={{
                root: i === tabIndex ? classes.selectedTabChip : classes.tabChip,
              }}
              clickable
            />
          }
          {...a11yProps(i)}
        />
      ))}
    </Tabs>
  );
}
