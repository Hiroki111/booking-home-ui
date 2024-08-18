import { useEffect } from 'react';

// By using scheduler components of @devexpress with React v18, these error messages are generated (https://github.com/facebook/react/issues/29233)
// @devexpress teams seems to be working on this issue (https://supportcenter.devexpress.com/ticket/details/t1239734/devexpress-dx-react-grid-material-ui-support-for-defaultprops-will-be-removed),but the issue still persists.
// Use this hook until the error is solved
export function useDefaultPropsWarningFilter() {
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args: any[]) => {
      if (
        typeof args[0] === 'string' &&
        (/Support for defaultProps will be removed from function components in a future major release./.test(args[0]) ||
          /Support for defaultProps will be removed from memo components in a future major release./.test(args[0]))
      ) {
        console.warn(
          'Support for defaultProps will be removed from function and memo components in a future major release',
        );
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);
}
