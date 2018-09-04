import React from 'react';
import PropsType from 'prop-types'
import { Route, Switch} from 'react-router-dom';
// import {Navbar, Nav, NavItem } from 'react-bootstrap';
import Auth from 'component/Auth';
import Footer from 'component/Footer';
import Navigation from 'component/Navi';
import Feed from 'component/Feed';
//import FeedPhoto from 'component/FeedPhoto';
import TestContainer from 'component/AnyFeed';
import People from 'component/People';
import Profile from 'component/Profile';

const App = props =>[
  <Navigation {...props} key={1}  /> ,
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  <Footer key={3} />
  ];
  App.PropsType = {
      isLoggedIn : PropsType.bool.isRequired
  };

const PrivateRoutes = props => (
  <Switch>
  <Route exact path="/profile" component={Profile}/> 
  <Route exact path="/people" component={People}/> 
  <Route exact path="/profile/:username" component={Profile}/> 
  <Route exact path="/feed" component={Feed}/> 
  <Route exact path="/test" component={TestContainer}/>      
  </Switch>  
)

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/test" component={TestContainer}/>      
    <Route exact path="/feed" component={Feed} />
    <Route exact path="/people" render={() =>"people"} />
  </Switch>  
)

export default App;
