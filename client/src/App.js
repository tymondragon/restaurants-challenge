import React, { useState, useEffect } from 'react';
import './App.css';
import { Box, Backdrop, CircularProgress, Drawer, List, Typography } from '@material-ui/core';
import Restaurants from './Restaurants';
import RestaurantDetails from './RestaurantDetails';

function App () {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const url = '/restaurants';

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        setIsFetching(false);
        throw new Error(`status ${response.status}`)
      } else {
        const data = await response.json()
        console.log(data)
        setRestaurants(data.restaurants)
        setIsFetching(false);
      }
    } catch (e) {
      setMessage(`API call failed: ${e}`);
    }
  };

  const fetchRestaurant = async (r, e) => {
    e.preventDefault();
    const response = await fetch(`${url}/${r.id}`);
    if (!response.ok) {
      throw new Error(`status ${response.status}`)
    } else {
      const data = await response.json()
      setRestaurant(data);
      setOpen(true);
    }
  };

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(!open);
  };

  useEffect(() => {
    setIsFetching(true)
    fetchRestaurants()
  }, [])

  return (

    <div className="App">
      {isFetching ?
        <Backdrop>
          <CircularProgress />
        </Backdrop> :
        <>
          <div className="column1">
            <Box className="roster" display="flex">
              <Box>
                <Typography variant="h3" component="h3">
                  Roster
              </Typography>
                <Typography variant="h5" component="h3">
                  Lunch Finder
              </Typography>
              </Box>
            </Box>
          </div>
          <div className="column2" style={{ backgroundColor: '#bbb' }}>
            <Box display="flex" flexDirection="row" pl={5}>
              <h2>Team Favorites</h2>
            </Box>
            <List>
              <Restaurants restaurants={restaurants} fetchRestaurant={fetchRestaurant} />
            </List>
          </div>
        </>}
      {restaurant ?
        <div>
          <React.Fragment >
            <Drawer anchor="right" open={open} onClose={(event) => toggleDrawer(event)}>
              <RestaurantDetails restaurant={restaurant} />
            </Drawer>
          </React.Fragment>
        </div> : <></>
      }
    </div>
  );
}

export default App;
