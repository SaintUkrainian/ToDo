import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware,} from "redux";
import thunk from "redux-thunk";
import authReducer from "./store/authReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(authReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter basename="todo-app">
                <App/>
            </BrowserRouter>
        </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
