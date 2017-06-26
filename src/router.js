
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage.js';
import VideoPage from './components/VideoPage/VideoPage.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import LoginPage from './components/LoginPage/LoginPage.js'

export default (
    <Switch>
        <Route component={ LandingPage } path='/' exact />
        <Route component={ VideoPage } path='/video' />
        <Route component={ SearchResults } path='/search' />
        <Route component={ LoginPage } path ='/login'/>
    </Switch>
)
