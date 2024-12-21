import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Products = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);
