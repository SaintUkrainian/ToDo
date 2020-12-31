import React, {useState} from "react";

import "./Auth.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import * as actions from "../../store/authReducer";

function Auth(props) {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        passwordWrong: null,
        emailWrong: null,
    });

    const handleInput = (event, element) => {
        setUserData({
                ...userData,
                [element]: event.target.value,
                [element + "Wrong"]: false,
            }
        );
    };

    const isValid = (element, regex) => {
        return regex.test(element);
    }

    const authenticate = (event) => {
        event.preventDefault();
        if (isValid("email", /.+.[a-z]+\.[a-z]{2,3}/) && isValid("password", /.{6,}/)) {
            console.log(userData);
        } else {
            if (!/.+.[a-z]+\.[a-z]{2,3}/.test(userData.email)) {
                setUserData(prevState => {
                    return {
                        ...prevState,
                        emailWrong: true
                    }
                });
            }
            if (!isValid(userData.password, /.{6,}/)) {
                setUserData(prevState => {
                    return {
                        ...prevState,
                        passwordWrong: true
                    }
                });
            }
            console.log(userData);
        }
        // if (props.toLogin) {
        //     axios.get().then(response => {
        //
        //     }).catch();
        // } else {
        //     axios.get().then().catch();
        // }
    }

    const setCredentials = (userId, token) => {
        props.setToken(token);
        props.setUserId(userId);
        props.setAuthenticated();
        localStorage.setItem("userId", userId);
    }

    return (
        <div className={"Auth"}>
            <h1 style={{color: "white"}}>{props.toLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={(event) => authenticate(event)}
                  className={"AuthForm"}>
                <input type="text" value={userData.email}
                       onChange={(event) => handleInput(event, "email")}
                       placeholder={"email"}
                       style={{backgroundColor: userData.emailWrong ? "salmon" : null}}/>
                <input type="password" value={userData.password}
                       onChange={(event) => handleInput(event, "password")}
                       placeholder={"password"}
                       style={{backgroundColor: userData.passwordWrong ? "salmon" : null}}/>
                <input type={"submit"}
                       value={props.toLogin ? "Login" : "Sign Up"}
                       className={"auth-btn"}/>
            </form>
            <Link to={"/"} style={{color: "white"}}>Back Home!</Link>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        toLogin: state.toLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setToken: (token) => dispatch(actions.setToken(token)),
        setUserId: (userId) => dispatch(actions.setUserId(userId)),
        setAuthenticated: () => dispatch(actions.setAuthenticated()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);