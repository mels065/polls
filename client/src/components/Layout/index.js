import React from "react";

import NavBar from "../modules/NavBar";

import "./style.scss";

function Layout({ children }) {
    return (
        <React.Fragment>
            <header id="Header">
                <NavBar />
            </header>
            <main id="Content">
                {children}
            </main>
            <footer id="Footer">
                <div className="copyright">
                    <small>&copy; Brandon Mellus 2019</small>
                </div>
            </footer>
        </React.Fragment>
    )
};

export default Layout;
