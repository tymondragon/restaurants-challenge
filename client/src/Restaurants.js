import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Restaurant from './Restaurant';

const useStyles = makeStyles({
  // root: {
  //   minWidth: 275,
  // },
  // bullet: {
  //   display: 'inline-block',
  //   margin: '0 2px',
  //   transform: 'scale(0.8)',
  // },
  // title: {
  //   fontSize: 14,
  // },
  // pos: {
  //   marginBottom: 12,
  // },
  card: {
    marginBottom: 10
  }
});

function Restaurants ({ restaurants }) {
  const classes = useStyles();
  return (
    <ul>
      {restaurants.map((restaurant => {
        return <Restaurant className={classes.card} key={restaurant.id} restaurant={restaurant} />
      }))}
    </ul>
  );
}

export default Restaurants;