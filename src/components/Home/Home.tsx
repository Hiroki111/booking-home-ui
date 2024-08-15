import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { Body } from './Body';
import { HomePageContextProvider } from '../../contexts/HomePageContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function Home() {
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
