import React from "react";

import "./NavBar.css";

function NavBar(props) {
    return (
        <div className="NavBar">
            <button className="AuthBtn Login" onClick={props.showModal}>Login</button>
            <h4>/</h4>
            <button className="AuthBtn SignUp">Sign up</button>
        </div>

    );
}

export default NavBar;