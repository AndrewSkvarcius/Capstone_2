import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../auth/LoginForm"
import SignupForm from "../auth/SignupForm"
import Homepage from "../home/Homepage";
import PrivateRoute from "./PrivateRoute"
import Weather from "../Weather";


function Routers({login, signup}) {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `signup=${typeof signup}`,
    );
    return (
        <div className="pt-5">
          <Routes>
  
            <Route exact path="/">
              <Homepage />
            </Route>
  
            <Route exact path="/login">
              <LoginForm login={login} />
            </Route>
  
            <Route exact path="/signup">
              <SignupForm signup={signup} />
            </Route>
  
            <PrivateRoute exact path="/favorites">
              <Weather />
            </PrivateRoute>
  
            <Navigate to="/" />
          </Routes>
        </div>
    );
  }
  
  export default Routers;
  
