import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { Body } from './Body';

export function Home() {
  return (
    <BrowserRouter>
      <Header />
      <Body />
    </BrowserRouter>
  );
}
