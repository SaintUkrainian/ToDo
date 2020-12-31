import React, {useState} from "react";

import "./App.css";

import NavBar from "./components/NavBar/NavBar";

import Main from "./components/Main/Main";
import {Route, Switch, Redirect} from "react-router";
import Auth from "./components/Auth/Auth";

function App() {

    const [auth, setAuth] = useState({
        authenticated: true,
        userId: null,
        login: false,
    });


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

export default App;
