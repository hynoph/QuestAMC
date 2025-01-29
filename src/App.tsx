import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Components/Landing/hero';
import Dashboard from './Components/Landing/dashboard';
import Products from './Components/Landing/products';
import Servers from './Components/Landing/servers';
import Internships from './Components/Landing/internships';
// Import other components if needed

function App() {
  return (
    <Router>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/internships" element={<Internships />} />
          {/* Add other routes if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;