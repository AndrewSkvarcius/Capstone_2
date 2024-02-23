import React, { useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import WeatherCardList from "../WeatherCardList";
import "./Homepage.css";
import AddFavLocationForm from "../AddFavLocationForm";


// Hompage Shows Welcome message or Login/register

//routed @ /

function Homepage(){
    const {currentUser} = useContext(UserContext);
    console.debug("Hompage", "currentUser=", currentUser)

    const handleAddFavorite = async (newLocation) => {
        if (!currentUser || !currentUser.id) {
          console.error("User ID is not available");
          return;
        }
        // Implement the logic to handle the new favorite location addition
        console.log("Adding new location:", newLocation);
        // You might want to call an API function here and pass `currentUser.id` and `newLocation`
      };

    

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Insta Weather</h1>
                <p className="lead">Get the weather in your city</p>
                {currentUser
                ? <h2>
                    Welcome Back,{ currentUser.username} here's your weather!
                    <AddFavLocationForm onAdd={handleAddFavorite}/>
                    <WeatherCardList userId={currentUser.id} />
               
                </h2>
             
                : (
                    <p>
                    
                        <Link className="btn btn-primary font-weight-bold mr-3"
                        to="/login">Login</Link>
                        <Link className="btn btn-primary font-weight-bold"
                        to="/signup">
                            Sign Up
                        </Link>
                    </p>
                )}
            </div>

        </div>
    );
}

export default Homepage;