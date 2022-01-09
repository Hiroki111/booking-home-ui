import { useEffect, useState } from 'react';
import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';

import { useHomePageContext } from '../../../../../../contexts/HomePageContext';
import { NavigationButton } from './NavigationButton';
import { useStyles } from './useStyles';

export function NavigationBar() {
  const classes = useStyles();
  const [displayedMonthText, setDisplayedMonthText] = useState(null as unknown as string);
  const { setSelectedDate } = useHomePageContext();

  function NavigationRootComponent(props: any) {
    useEffect(() => {
      setDisplayedMonthText(props.navigatorText);
    }, [props]);
    return <DateNavigator.Root {...props} />;
  }

  function OpenButtonComponent(props: any) {
    return (
      <DateNavigator.OpenButton {...{ ...props, onVisibilityToggle: () => null }} className={classes.monthLabel} />
    );
  }

  return (
    <DateNavigator
      navigationButtonComponent={(props) => (
        <NavigationButton {...props} displayedMonthText={displayedMonthText} setSelectedDate={setSelectedDate} />
      )}
      rootComponent={NavigationRootComponent}
      openButtonComponent={OpenButtonComponent}
    />
  );
}
