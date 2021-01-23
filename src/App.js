import React, {useState, useEffect} from "react";

import "./App.css";

import NavBar from "./components/NavBar/NavBar";

import Main from "./components/Main/Main";
import {Route, Switch, Redirect} from "react-router";
import Auth from "./components/Auth/Auth";
import {checkAuth} from "./store/authActions";
import {connect} from "react-redux"

function App(props) {

    const [auth, setAuth] = useState({
        authenticated: true,
        userId: null,
        login: false,
    });

    const {checkAuth} = props;

    useEffect(() => {
        checkAuth();
    })

    return (
        <div className="App">
            <NavBar auth={auth} setAuth={setAuth}/>
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route exact path="/" component={Main} />
                <Redirect to={"/"}/>
            </Switch>

        </div>
    );
}

const mapDispatchToProps = dispatch  => {
    return {
        checkAuth: () => dispatch(checkAuth()),
    }
}

export default connect(null, mapDispatchToProps)(App);
