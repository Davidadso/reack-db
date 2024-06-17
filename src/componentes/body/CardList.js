// CardList.js
import React from 'react';
import Cards from './Cards';
import data from './data';

const CardList = ({ onAddToCart, isLoggedIn}) => {
  return (
    <div className="divCards">
      {data.map((item) => (
        <Cards 
          key={item.id} 
          item={item} 
          onAddToCart={onAddToCart} 
          isLoggedIn={isLoggedIn} // Pasar isLoggedIn a Cards
        />
      ))}
    </div>
  );
};

export default CardList;
