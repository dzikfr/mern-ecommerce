import React from "react"
import {Routes, Route, useLocation} from "react-router-dom";
import ProtectedRouter from "./components/ProtectedRouter.jsx";
import Admin from "./pages/Admin";
import DeleteProduct from "./pages/DeleteProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import "./index.css"

function App() {
  return (
    <>
    <h1>test</h1>
    {/* <Routes>
      <Route
        path="/admin/*"
        element={
          <ProtectedRouter>
            <AdminRoutes/>
          </ProtectedRouter>
        }
      />
    </Routes> */}
    </>
  )
};

const AdminRoutes = () => {
  return(
    <Routes>
      <Route path="/" element={<Admin/>}/>
      {/* <Route path="/product/edit/:id" element={<EditProduct/>}/>
      <Route path="/product/delete/:id" element={<DeleteProduct/>}/> */}
    </Routes>
  )
};

export default App