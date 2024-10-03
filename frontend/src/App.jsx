import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRouter from "./components/ProtectedRouter.jsx";
import "./index.css";
import Admin from "./pages/Admin";
import DeleteProduct from "./pages/DeleteProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRouter>
              <AdminRoutes />
            </ProtectedRouter>
          }
        />
      </Routes>
    </>
  );
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/product/create" element={<CreateProduct />} />
      <Route path="/product/edit/:id" element={<EditProduct />} />
      <Route path="/product/delete/:id" element={<DeleteProduct />} />
    </Routes>
  );
};

export default App;
