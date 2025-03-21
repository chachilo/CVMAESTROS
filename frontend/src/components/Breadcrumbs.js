import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className="bg-light p-3 rounded">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/dashboard">Inicio</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li key={name} className="breadcrumb-item active" aria-current="page">
              {name}
            </li>
          ) : (
            <li key={name} className="breadcrumb-item">
              <Link to={routeTo}>{name}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;