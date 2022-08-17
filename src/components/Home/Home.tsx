import { QueryClient, QueryClientProvider } from 'react-query';

import { HomeContent } from './HomeContent';
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
    <QueryClientProvider client={queryClient}>
      <HomePageContextProvider>
        <HomeContent />
      </HomePageContextProvider>
    </QueryClientProvider>
  );
}
