import React from 'react';
import ReactDOM from 'react-dom';
import './assets/app.scss';
import Viewer from "./components/Viewer";

const App = () => <Viewer/>;

ReactDOM.render(<App />, document.getElementById('root'));
