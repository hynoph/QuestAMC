import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Components/hero';
import Dashboard from './Components/dashboard';
import Products from './Components/products';
import Servers from './Components/servers';
import Internships from './Components/internships';
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