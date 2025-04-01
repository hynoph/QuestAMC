import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Components/Landing/hero';
import Products from './Components/Landing/products';
import Servers from './Components/Landing/servers';
import Internships from './Components/Landing/internships';
import Login from './Components/Auth/login';
import Dashboard from './Components/Landing/dashboard';
import Module from './Components/Landing/modules';
import Mocks from './Components/Landing/mocks';
import Review from './Components/Landing/review';
// Import other components if needed

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/login" element={<Login />} />
          <Route path="/modules" element={<Module />} />
          <Route path="/modules/mocks" element={<Mocks />} />
          <Route path="/topicsreview" element={<Review />} />
          {/* Add other routes if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;