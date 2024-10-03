import React from "react";
import {Navigate} from "react-router-dom";

const isAuthenticated = () => {
    //todo next
    // return !!localStorage.getItem("token");
    return true;
};

const ProtectedRouter = ({children}) => {
    if(!isAuthenticated()){
        return <Navigate to="/login" replace />
    }
    return children;
};

export default ProtectedRouter;