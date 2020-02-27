import React from 'react';
import ReactDOM from 'react-dom';
import './assets/app.scss';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Viewer from "./components/Viewer";
import {Provider} from "react-redux";
import store from "./store";

const App = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/dashboard" component={Viewer}/>
                <Redirect to="/dashboard"/>
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
