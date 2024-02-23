// App.js
import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/UseLocalStorage";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes/Routes";
import Navigation from "./routes/Navigation";
import FavsApi from "./FavsApi"
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";



export const TOKEN_STORAGE_ID = "user-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [favoritesUpdated, setFavoritesUpdated] = useState(false)

  // Function to toggle the favorites updated state
  const notifyFavoritesUpdated = () => {
    setFavoritesUpdated(!favoritesUpdated);
  };

  useEffect(function loadUserInfo() {
    async function getCurrentUser(){
      if(token){
        try{
          let {username} = jwt.decode(token);
          console.log("Token from localStorage:", token); // Debugging line
          //token on API class so it can be called 
          let currentUser = await FavsApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          console.log("currentUser", currentUser)
        } catch(e){
          console.error("App loadUserInfo problem loading", e);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    

    setInfoLoaded(false);
    getCurrentUser();
    
    
    }, [token, favoritesUpdated]);

    async function signup(signupData) {
      try{
        let token = await FavsApi.signup(signupData);
        setToken(token);
        return { success: true };
      }catch(e){
        console.error("signup fail", e);
        return { success: false, e};
      }
    }

  // Handles site wide login
  // await function and check return value
  
  async function login(loginData){
    try{
      let token = await FavsApi.login(loginData);
      console.log("Received token:", token); // Debugging line
      setToken(token);
      FavsApi.token = token;
      return { success: true };
    }catch(e){
      console.error("login fail", e);
      return { success: false, e};
    }
  }
  //Handles logout

function logout(){
  setCurrentUser(null);
  setToken(null);
}


  return (
    <BrowserRouter>
    <UserContext.Provider
    value={{ currentUser, setCurrentUser, notifyFavoritesUpdated}}>
      <div className="App">
        <Navigation logout={logout} />
        <Routers login={login} signup={signup} />
      </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

