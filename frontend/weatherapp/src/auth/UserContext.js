// UserContext.js
import React from "react";

// Initialize with undefined for better auto-completion in IDEs if needed
const UserContext = React.createContext({
  currentUser: undefined,
  setCurrentUser: () => {}, // For setting the current user
  notifyFavoritesUpdated: () => {}, // Function to call when favorites are updated
  favoritesUpdated: false // State to track if favorites were updated
});

export default UserContext;