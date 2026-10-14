import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Plates from './pages/Plates.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import Auth from './pages/Auth.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const pages = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'plates', element: <Plates /> },
      { path: 'auth', element: <Auth /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'cart', element: <Cart /> },
          { path: 'profile', element: <Profile /> },
        ],
      },
      { path: '*', element: <Home /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={pages} />
  </StrictMode>,
);
