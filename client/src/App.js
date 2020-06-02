import React, { useState, useEffect } from 'react';
import './App.css';

function App () {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const url = '/restaurants'
  const fetchRestaurants = async () => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`status ${response.status}`)
    } else {
      const data = await response.json()
      setRestaurants(data.restaurants)
    }
  }

  const fetchRestaurant = async (r, e) => {
    e.preventDefault();
    console.log(r)
    const response = await fetch(`${url}/${r.id}`);
    if (!response.ok) {
      throw new Error(`status ${response.status}`)
    } else {
      const data = await response.json()
      setRestaurant(data)
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  return (
  
    <div className="App">
      <header className="App-header">
        <p>
          Roster Restaurants
        </p>

        <ul>
          {restaurants.map((restaurant, i) => {
            return <li key={restaurant.id} onClick={(e) => fetchRestaurant(restaurant, e)}> {restaurant.placeId} </li>
          })}
        </ul>
      {restaurant ? <p>{restaurant.name}</p> : null  }
      </header>
    </div>
  );
}

export default App;
