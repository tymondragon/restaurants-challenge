import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles({
  root: {
    minWidth: 700,
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

function RestaurantDetails ({ restaurant }) {
  const classes = useStyles();
  const hours = restaurant.hoursOfOperation


  return (
    <Box mt={5} className={classes.root} variant="outlined" height={100}>
      <Box mb={5} p={5} display="flex" flexDirection="row">
        <Box flexGrow={1}>
          <Typography variant="h5" component="h2">
            {restaurant.name}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            Rating: {restaurant.rating}
          </Typography>
        </Box>
        {true === true?
          <Box display="flex" alignItems="center" width="30%">
            <FiberManualRecordIcon className={classes.open} />
            <Typography variant="h6" fontWeight="fontWeightBold" className={classes.space}>Open For Luch!</Typography>
          </Box>
          :
          <Box display="flex" alignItems="center" width="30%">
            <FiberManualRecordIcon className={classes.closed} />
            <Typography variant="h6" fontWeight="fontWeightBold" className={classes.space}>Closed</Typography>
          </Box>}
      </Box>
      <Divider />
      <Box mt={5} pl={7} pr={7} pb={5} display="flex" flexDirection="column">
        <Box>
          <Typography variant="h5" component="h3">
            Hours:
          </Typography>
          <Box>
            {hours ? <ListTimes hours={hours} /> : null}
          </Box>
        </Box>
        <Box mb={5}>
          <Typography variant="h5" component="h3">
            Address:
          </Typography>
          <Typography variant="h6">
            {restaurant.address}
          </Typography>
        </Box>
        <Box mb={5}>
          <Typography variant="h5" component="h3">
            Phone:
          </Typography>
          <Typography variant="h6">
            {restaurant.phoneNumber}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" component="h3">
            <a href={restaurant.website} target="_blank" rel="noopener noreferrer">Website</a>
          </Typography>
        </Box>
      </Box>
      <Box display="flex" height="50%" flexDirection="row">
      </Box>
    </Box>
  );
}

function ListTimes ({ hours }) {
  return (
    <List component="nav" aria-label="contacts">
      {hours.map((time, i) => {
        return (
          <ListItem key={i}>
            <ListItemText primary={time} />
          </ListItem>)
      })}
    </List>
  )
}

export default RestaurantDetails;