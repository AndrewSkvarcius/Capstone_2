import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

function Navigation({ logout }) {
const { currentUser } = useContext(UserContext);
console.debug("Navigation", "currentUser=", currentUser);


function loggedInNav() {
    return (
        <ul className="navbar-nav ml-auto">
            
            <li className="nav-item mr-4">
                <NavLink clasName="nav-link" to="/favorites">Your Weathewer</NavLink>
            </li>
            
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>

            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                    Log Out { currentUser.username }
                </Link>
                
            </li>
        </ul>
    )
}

function loggedOutNav(){
    return(
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>

            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
            </li>

        </ul>
    )

}

return (
    <nav className="Navigation navbar navbar-expand-md">
        <Link className="nav-brand" to="/">
            Jobly
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
);

}
export default Navigation;