import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getSession } from '../lib/authStorage';

function ProtectedRoute() {
  const location = useLocation();

  return getSession() ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" replace state={{ from: location.pathname }} />
  );
}

export default ProtectedRoute;
