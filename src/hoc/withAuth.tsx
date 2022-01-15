import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { ROUTES } from '../routes';
import restApi from '../network/restApi';

export const withAuth = (Component: () => JSX.Element) => ({ ...props }) => {
  const [loading, setLoading] = useState(true);
  const [willRedirectToLogin, setWillRedirectToLogin] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    try {
      await restApi.checkLoginStatus();
    } catch (err) {
      console.error(err);
      setWillRedirectToLogin(true);
    }
    setLoading(false);
  }

  if (loading) {
    return null;
  } else if (willRedirectToLogin) {
    return <Redirect to={ROUTES.login} />;
  }
  return <Component {...props} />;
};
