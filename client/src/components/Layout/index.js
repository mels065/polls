import React from "react";

import "./style.scss";

function Layout({ children }) {
    return (
        <React.Fragment>
            <header id="Header"></header>
            <main id="Content">
                {children}
            </main>
            <footer id="Footer"></footer>
        </React.Fragment>
    )
};

export default Layout;
