import React from "react";

import "./App.css";

import NavBar from "./components/NavBar/NavBar";

import Main from "./components/Main/Main";
import {Route, Switch} from "react-router";

function App() {


    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route path="/" component={Main} />
            </Switch>

        </div>
    );
}

export default App;
