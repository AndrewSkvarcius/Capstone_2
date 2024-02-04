// App.js
import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/UseLocalStorage";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/Routes";
import Weather from './Weather';
import * as userService from "./userService";

export const TOKEN_STORAGE_ID = "user-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          // Assuming you have an endpoint to fetch current user's data
          const userData = await userService.getCurrentUser();
          setCurrentUser(userData);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }
    };

    fetchCurrentUser();
  }, [token]);

  async function signup(signupData) {
    try {
      const response = await userService.addUser(signupData);
      if (response.token) {
        setToken(response.token);
      }
      // handle additional logic like updating the current user
    } catch (error) {
      console.error("Signup error:", error);
    }
  }

  // Implement other user-related functions like login, updateProfile, etc.

  return (
    <BrowserRouter>
      <Routers signup={signup} token={token} currentUser={currentUser} />
      <Weather />
    </BrowserRouter>
  );
}

export default App;

