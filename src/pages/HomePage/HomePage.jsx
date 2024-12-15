import React from 'react';
import './HomePage.scss';
import Card from './Card/Card';

const HomePage = () => {
  return (
    <div className="home">
      <main className="home-main">
        <Card />
      </main>
    </div>
  );
};

export default HomePage;