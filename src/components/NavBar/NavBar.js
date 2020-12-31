import React from "react";

import "./NavBar.css";
import {NavLink} from "react-router-dom";
import {setToLogin} from "../../store/authReducer";
import {connect} from "react-redux";

function NavBar(props) {
    return (
        <div className="NavBar">
            <h1 style={{color: "white"}}>Todo app</h1>
            <div className={"Buttons"}>
                <NavLink className="AuthBtn Login" to={"/auth"}
                         onClick={() => props.setToLogin(true)}>Login</NavLink>
                <h4>/</h4>
                <NavLink className="AuthBtn SignUp" to={"/auth"}
                         onClick={() => props.setToLogin(false)}>Sign up</NavLink>
            </div>
        </div>

    );
}

const mapDispatchToProps = dispatch => {
    return {
        setToLogin: (value) => dispatch(setToLogin(value)),
    }
}

export default connect(null, mapDispatchToProps)(NavBar);