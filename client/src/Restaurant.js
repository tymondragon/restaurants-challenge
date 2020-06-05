import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles({
  root: {
    margin: 50,
    minWidth: 275,
    cursor: "pointer",
  },
  title: {
    fontSize: 14,
  },
  ul: {
    listStyleType: 'none',
    paddingLeft: 0
  },
  open: {
    color: 'green',
    marginRight: 5,
  },
  closed: {
    color: 'red',
    marginRight: 5,
  }
});

function Restaurant ({ restaurant, fetchRestaurant } ) {
  const classes = useStyles();
  const hours = restaurant.hoursOfOperation
  console.log(hours, "in res comp")
  return (
    <Card className={classes.root} variant="outlined" onClick={(event) => fetchRestaurant(restaurant, event)} >
      <CardContent>
        <Box p={5} display="flex" flexDirection="row">
          <Box display="flex" alignSelf="center" flexDirection="column" width="33%">
            <Typography variant="h5" component="h2">
              {restaurant.name}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              Rating: {restaurant.rating}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" width="33%">
            {hours ? <ListTimes hours={hours}/> : <Typography>Visit the website to view hours of operation.</Typography>}
          </Box>
          <Box width="33%" alignSelf="center" display="flex" justifyContent="center">
            {restaurant.openNow ? <Box display="flex" flexDirection="row">
              <FiberManualRecordIcon className={classes.open}/>
              <Typography variant="h6" fontWeight="fontWeightBold">Open For Luch!</Typography>

            </Box>
           :
              <Box display="flex" flexDirection="row">
                <FiberManualRecordIcon className={classes.closed}/>
                <Typography variant="h6" fontWeight="fontWeightBold">Closed</Typography>
              </Box> }
          </Box>
          {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
        </Typography> */}

            {/* <Typography className={classes.pos} color="textSecondary">
            adjective
        </Typography> */}
            {/* <Typography variant="body2" component="p">
            well meaning and kindly.
          <br />
            {'"a benevolent smile"'}
          </Typography> */}
          </Box>
      </CardContent>
        {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

function ListTimes ({ hours }) {
  const classes = useStyles();
  return (
    <ul className={classes.ul}>
        {hours.map((time, i) => {
          return (
            <li key={i}>
              <Box display="flex" justifyContent="flex-start" >{time}</Box>
            </li>)
        })}
      </ul>
  )
}

export default Restaurant;