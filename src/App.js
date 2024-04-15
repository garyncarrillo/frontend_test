import logo from './logo.svg';
import './App.css';

import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './config/routes';

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
