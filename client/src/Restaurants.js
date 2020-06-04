import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Restaurant from './Restaurant';

const useStyles = makeStyles({
  card: {
    marginBottom: 10
  }
});

function Restaurants ({ restaurants, fetchRestaurant }) {
  const classes = useStyles();
  return (
    <div>
      {restaurants.map((restaurant => {
        return <Restaurant key={restaurant.id} restaurant={restaurant} fetchRestaurant={fetchRestaurant}/>
      }))}
    </div>
  );
}

export default Restaurants;