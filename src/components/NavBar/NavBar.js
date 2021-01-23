import React from "react";

import "./NavBar.css";
import {NavLink} from "react-router-dom";
import {setToLogin, logout} from "../../store/authActions";
import {connect} from "react-redux";

function NavBar(props) {
    let itemsToBeDisplayed = null;

    if(!props.authenticated) {
        itemsToBeDisplayed = (
            <div className={"Buttons"}>
                <NavLink className="AuthBtn Login" to={"/auth"}
                         onClick={() => props.setToLogin(true)}>Login</NavLink>
                <h4>/</h4>
                <NavLink className="AuthBtn SignUp" to={"/auth"}
                         onClick={() => props.setToLogin(false)}>Sign up</NavLink>
            </div>
        );
    } else {
        itemsToBeDisplayed = <button className={"AuthBtn"} onClick={props.logout}>Logout</button>
    }
    return (
        <div className="NavBar">
            <h1 style={{color: "white"}}>Todo app</h1>
            {itemsToBeDisplayed}
        </div>

    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.authenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setToLogin: (value) => dispatch(setToLogin(value)),
        logout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);