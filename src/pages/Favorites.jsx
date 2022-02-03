import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <span>Favorites</span>
        <Header />
      </div>
    );
  }
}

export default Favorites;
