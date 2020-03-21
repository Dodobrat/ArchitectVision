import React from 'react';
import ReactDOM from 'react-dom';
import './assets/app.scss';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Dashboard from "./components/Dashboard";
import Viewer from "./components/Viewer";

const App = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/app" exact component={Dashboard}/>
                <Route path="/room/:id" exact component={Viewer}/>
                <Redirect to="/app"/>
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
