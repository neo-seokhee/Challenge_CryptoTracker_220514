import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/:coinId/*`}
          element={<Coin />}
        />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
