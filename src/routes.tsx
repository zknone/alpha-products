import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Products from "./pages/products/products";
import ProductDetails from "./pages/productDetails/productDetails";
import Form from "./pages/createProduct/createProduct";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products/:productId" element={<ProductDetails />} />
      <Route path="/create-product" element={<Form />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  </Router>
);
