import { FC } from 'react';
import './App.css';
import { Link, Outlet } from 'react-router-dom';

const App: FC = () => {
  return (
    <>
      <h1>Hello world</h1>
      <hr />
      <nav>
        <ul>
          <li>
            <Link to={''}>Home</Link>
          </li>
          <li>
            <Link to={'main'}>Main page</Link>
          </li>
          <li>
            <Link to={'catalogo'}>General Catalog</Link>
          </li>
          <li>
            <Link to={'busqueda'}>Busqueda</Link>
          </li>
          <li>
            <Link to={'busquedaResultados'}>Busqueda Resultados</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
