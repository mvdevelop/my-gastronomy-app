
import './index.css';

import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { CartProvider } from './contexts/UseCartContext';

function App() {

  return (
    <>
      <CartProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </>
  )
}

export default App;
