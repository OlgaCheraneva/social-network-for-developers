import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import './App.css';

const App = () => (
    <Router>
        <Fragment>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Landing} />
            </Switch>
        </Fragment>
    </Router>
);

export default App;
