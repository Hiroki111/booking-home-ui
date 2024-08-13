import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { Body } from './Body';
import { HomePageContextProvider } from '../../contexts/HomePageContext';

export function Home() {
  return (
    <BrowserRouter>
      <HomePageContextProvider>
        <Header />
        <Body />
      </HomePageContextProvider>
    </BrowserRouter>
  );
}
