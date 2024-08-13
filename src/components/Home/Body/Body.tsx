import { Route, Routes } from 'react-router-dom';

import { BottomBar } from './BottomBar';
import { splitComponentRoutes, fullWidthComponentRoutes } from '../../../routes';

export function Body() {
  const fetchServiceTypesQuery = { isLoading: false, isError: false };
  const fetchStaffListQuery = { isLoading: false, isError: false };

  if (fetchServiceTypesQuery.isLoading) {
    return <div>loading...</div>;
  }

  if (fetchServiceTypesQuery.isError || fetchStaffListQuery.isError) {
    return <div>server error</div>;
  }

  return (
    <div>
      <div>
        <Routes>
          {splitComponentRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <div>
                  <Component />
                </div>
              }
            />
          ))}
          {fullWidthComponentRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <div>
                  <Component />
                </div>
              }
            />
          ))}
        </Routes>
        {/** Move this to Home */}
        <BottomBar />
      </div>
    </div>
  );
}
