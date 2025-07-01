
import React from 'react';
import {  Switch } from 'react-router';
import { Route,BrowserRouter as Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Work from './components/Work/work'
import About from './components/About/about'
import Blog from './components/Blogs/blog'
import Test from './components/Test/test'

export default (
    <Router history={createBrowserHistory()} >
    <Navbar/>
    <Switch>
        <Route path="/" exact render={(props) => <Hero {...props} />}/>
        <Route path="/about" exact render={(props) => <About {...props} />} />
        <Route path="/work" exact render={(props) => <Work {...props} />} />
        <Route path="/blog" exact render={(props) => <Blog {...props} />} />
        <Route path="/test" exact render={(props) => <Test {...props} />} />

    </Switch>
    </Router>
);
