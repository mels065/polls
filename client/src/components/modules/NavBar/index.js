import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faUser,
    faSignOutAlt,
    faSignInAlt,
    faUserPlus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";

import MenuLink from "../MenuLink";

import { CurrentUserContext } from "../../context/CurrentUser";

import "./style.scss";

function NavBar() {
    const currentUserContext = React.useContext(CurrentUserContext);

    return (
        <nav className="navbar">
            <Link to="/">
                <div className="logo">
                    <h1>Polling</h1>
                </div>
            </Link>
            <div className="menu-opts">
                <ul>
                    {
                        window.localStorage.getItem("token") || currentUserContext.userId ?
                            (
                                <React.Fragment>
                                    <li>
                                        <MenuLink to="/create-poll" icon={faPlus} />
                                    </li>
                                    <li>
                                        <MenuLink to="/profile" icon={faUser}>
                                            Profile
                                        </MenuLink>
                                    </li>
                                    <li>
                                        <MenuLink to="/logout" icon={faSignOutAlt}>
                                            Logout
                                        </MenuLink>
                                    </li>
                                </React.Fragment>
                            ) :
                            (
                                <React.Fragment>
                                    <li>
                                        <MenuLink to="/login" icon={faSignInAlt}>
                                            Login
                                        </MenuLink>
                                    </li>
                                    <li>
                                        <MenuLink to="/register" icon={faUserPlus}>
                                            Register
                                        </MenuLink>
                                    </li>
                                </React.Fragment>
                            )
                    }
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
