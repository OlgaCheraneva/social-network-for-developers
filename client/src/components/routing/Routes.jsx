import React from 'react';
import {Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Post from '../post/Post';
import Posts from '../posts/Posts';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';

const Routes = () => (
    <section className="container">
        <Alert />
        <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
                exact
                path="/create-profile"
                component={ProfileForm}
            />
            <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
            <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
            />
            <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
            />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/posts/:id" component={Post} />
            <Route component={NotFound} />
        </Switch>
    </section>
);

export default Routes;
