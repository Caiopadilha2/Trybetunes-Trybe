import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <span>Login</span>
        <Header />
      </div>
    );
  }
}

export default Search;
