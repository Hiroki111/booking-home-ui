import { BrowserRouter } from 'react-router-dom';
import { Header } from './HomeContent/Header';
import { Body } from './HomeContent/Body';

export function Home() {
  return (
    <BrowserRouter>
      <Header />
      <Body />
    </BrowserRouter>
  );
}
