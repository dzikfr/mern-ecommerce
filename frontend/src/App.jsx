import React from "react"
import {Routes, Route, useLocation} from "react-router-dom";
import ProtectedRouter from "./components/ProtectedRouter.jsx";
import Admin from "./pages/Admin";
import "./index.css"

function App() {
  return (
    <>
    <Routes>
      <Route
        path="/admin/*"
        element={
          <ProtectedRouter>
            <AdminRoutes/>
          </ProtectedRouter>
        }
      />
    </Routes>
    </>
  )
};

const AdminRoutes = () => {
  return(
    <Routes>
      <Route path="/" element={<Admin/>}/>
    </Routes>
  )
};

export default App