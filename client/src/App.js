import React, { useState, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App () {
  const [restaurants, setRestaurants] = useState([]);
  const [url, setUrl] = useState('/restaurants')

  const fetchRestaurants = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`)
        }
        return response.json();
      })
      .then(json => {
        setRestaurants(json.restaurants)
      })
  }, [url])

  useEffect(() => {
    fetchRestaurants()
  }, [fetchRestaurants])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Roster Restaurants
        </p>

        <ul>
          {restaurants.map((restaurant, i) => {
            return <li key={restaurant.id}> {restaurant.placeId} </li>
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
