import React from 'react';
import ReactDOM from 'react-dom';
import './assets/app.scss';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import Dashboard from "./components/Dashboard";

const App = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={Dashboard}/>
                {/*<Route path="/:id" component={Dashboard}/>*/}
                <Redirect to="/"/>
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
