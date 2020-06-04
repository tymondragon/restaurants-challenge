import React from 'react';
import './App.css';
import Restaurant from './Restaurant';


function Restaurants ({ restaurants, fetchRestaurant }) {
  return (
    <div>
      {restaurants.map((restaurant => {
        return <Restaurant key={restaurant.id} restaurant={restaurant} fetchRestaurant={fetchRestaurant}/>
      }))}
    </div>
  );
}

export default Restaurants;