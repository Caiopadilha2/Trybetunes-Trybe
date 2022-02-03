import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>

        <Route path="/" Component={ Login } />
        <Route path="/search" Component={ Search } />
        <Route path="/album/:id" Component={ Album } />
        <Route path="/favorites" Component={ Favorites } />
        <Route path="/profile/edit" Component={ ProfileEdit } />
        <Route path="/profile" Component={ Profile } />
        <Route path="/*" Component={ NotFound } />

      </BrowserRouter>
    );
  }
}

export default App;
