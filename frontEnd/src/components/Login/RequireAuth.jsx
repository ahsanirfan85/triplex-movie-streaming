import React from 'react';
import Userfront from '@userfront/core';
import {
  BrowserRouter as Router,
  Redirect,
  useLocation,
} from "react-router-dom";

function RequireAuth({ children }) {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
      // Redirect to the /login page
      return <Redirect to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }

  export default RequireAuth;