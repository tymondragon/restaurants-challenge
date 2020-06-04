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
    <ul>
      {restaurants.map((restaurant => {
        return <Restaurant className={classes.card} key={restaurant.id} restaurant={restaurant} fetchRestaurant={fetchRestaurant}/>
      }))}
    </ul>
  );
}

export default Restaurants;