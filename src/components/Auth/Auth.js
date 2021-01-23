import React, {useState} from "react";

import "./Auth.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import * as actions from "../../store/authActions";
import {Redirect} from "react-router";

function Auth(props) {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        passwordWrong: null,
        emailWrong: null,
    });

    const [errorMsg, setErrorMsg] = useState("");

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
        const email = userData.email.trim();
        const password = userData.password.trim();
        if (/.+.[a-z]+\.[a-z]{2,3}/.test(email) && /.{6,}/.test(password)) {
            const url = props.toLogin
                ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtXkNYeovl9gqg1Fcv2M3AEwfj8Z22ZvA"
                : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtXkNYeovl9gqg1Fcv2M3AEwfj8Z22ZvA";
            axios.post(url, {
                email: email,
                password: password,
                returnSecureToken: true
            }).then(response => {
                setCredentials(response.data.localId, response.data.idToken, response.data.expiresIn);
            }).catch(error => setErrorMsg(props.toLogin ? "Invalid credentials!" : "User already exists!"));
        } else {
            if (!/.+.[a-z]+\.[a-z]{2,3}/.test(email)) {
                setUserData(prevState => {
                    return {
                        ...prevState,
                        emailWrong: true
                    }
                });
            }
            if (!isValid(password, /.{6,}/)) {
                setUserData(prevState => {
                    return {
                        ...prevState,
                        passwordWrong: true
                    }
                });
            }
        }
    }

    const setCredentials = (userId, token, expiresIn) => {
        props.setUserId(userId);
        props.setAuthenticated();
        props.setToken(token);


        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);

        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);
    }

    return (
        <div className={"Auth"}>
            {props.authenticated ? <Redirect to={"/"} /> : null}
            <h1 style={{color: "white"}}>{props.toLogin ? "Login" : "Sign Up"}</h1>
            {errorMsg ? <p style={{color: "salmon"}}>{errorMsg}</p> : null}
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
        authenticated: state.authenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setToken: (token) => dispatch(actions.setToken(token)),
        setUserId: (userId) => dispatch(actions.setUserId(userId)),
        setAuthenticated: () => dispatch(actions.setAuthenticated()),
        logout: () => dispatch(actions.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);