import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { User } from './api/session'
import { Session } from './api/session'


import NavBar from './components/NavBar'

import WelcomePage from './screens/WelcomePage'
import AuctionIndexPage from './screens/AuctionIndexPage'
import AuctionNewPage from './screens/AuctionNewPage'
import AuctionShowPage from './screens/AuctionShowPage'
import SignIn from './screens/SignIn'

import AuthRoute from './components/AuthRoute'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    getUser()

  }, [])

  const getUser = () => {
    // 1) fire off an api request to get information about the current logged in user.
    // 2) when it gets a response update the state with the user information
    User.current().then((data) => {
      console.log(data);
      setCurrentUser(data)
    });
  }

  const destroySession = () => {
    Session.destroy().then(() => {
      setCurrentUser(null);
    });
  };

  console.log("currentuser", currentUser)
  return (
    <BrowserRouter>
      <header>
        <NavBar currentUser={currentUser} signOut={destroySession} />
      </header>
      <div className="ui container App">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/auctions" component={AuctionIndexPage} />
          <AuthRoute isAllowed={currentUser} exact path="/auctions/new" component={AuctionNewPage} />
          <Route path="/auctions/:id" component={AuctionShowPage} />
          <Route path="/sign_in" render={(routeProps) => <SignIn {...routeProps} theThing={getUser} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
