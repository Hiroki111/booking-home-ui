import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { Body } from './Body';
import { HomePageContextProvider } from '../../contexts/HomePageContext';
import { useDefaultPropsWarningFilter } from '../../hooks/console-error';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function Home() {
  useDefaultPropsWarningFilter();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HomePageContextProvider>
          <Header />
          <Body />
        </HomePageContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
