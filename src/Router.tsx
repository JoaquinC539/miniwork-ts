import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import GeneralCatalog from './pages/GeneralCatalog';
import Busqueda from './pages/Busqueda';
import BusquedaResultados from './pages/BusquedaResultados';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path:'catalogo',
        element:<GeneralCatalog/>
      },
      {
        path:'busqueda',
        element:<Busqueda />
      },
      {
        path:'busquedaResultados',
        element:<BusquedaResultados />
      }
    ],
  },
]);