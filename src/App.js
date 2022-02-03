import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>

        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/Search" component={ Search } />
          <Route path="/Album/:id" component={ Album } />
          <Route path="/Favorites" component={ Favorites } />
          <Route path="/Profile/edit" component={ ProfileEdit } />
          <Route path="/Profile" component={ Profile } />
          <Route path="*" component={ NotFound } />

        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
