import React, { useState, useEffect } from 'react';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Restaurants from './Restaurants'
import Box from '@material-ui/core/Box';

function App () {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState(null);

  const url = '/restaurants'
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`status ${response.status}`)
        setIsFetching(false);
      } else {
        const data = await response.json()
        setRestaurants(data.restaurants)
        setIsFetching(false);
      }
    } catch (e) {
      setMessage(`API call failed: ${e}`);
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
    setIsFetching(true)
    fetchRestaurants()
    console.log(restaurants, "useEffect")
  }, [])

  return (

    <div className="App">
      {isFetching ?
        <CircularProgress /> :
        <>
          <div className="column1">
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <h2>Roster</h2>
              <p>Lunch Finder</p>
            </Box>
          </div>
          <div className="column2" style={{ backgroundColor: '#bbb' }}>
            <Box display="flex" flexDirection="row" pl={5}>
              <h2>Team Favorites</h2>
            </Box>
            <ul>
              <Restaurants restaurants={restaurants} />
            </ul>
          </div>
        </>}
    </div>
  );
}

export default App;
