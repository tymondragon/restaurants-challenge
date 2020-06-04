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
import { flexbox, flexDirection, flexGrow, height, sizing, minHeight } from '@material-ui/system';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles({
  root: {
    minWidth: 700,
  },
  // title: {
  //   fontSize: 14,
  // },
  // pos: {
  //   marginBottom: 12,
  // },
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
  console.log(restaurant)
  const classes = useStyles();
  // const hours = restaurant.hoursOfOperation
  const hours = [
    "Monday: Closed",
    "Tuesday: 11:00 AM – 7:00 PM",
    "Wednesday: 11:00 AM – 7:00 PM"
  ]

  return (
    <Box mt={5} className={classes.root} variant="outlined" height={100}>
      <Box mb={5} p={5} display="flex" flexDirection="row">
        <Box flexGrow={1}>
          <Typography variant="h5" component="h2">
            The Roost
            </Typography>
          <Typography variant="subtitle1" component="h2">
            Rating: 5
            </Typography>
        </Box>
        {restaurant.openNow ?
          <Box display="flex" flexDirection="row" alignItems="center" width="20%">
            <FiberManualRecordIcon className={classes.open} />
            <div className={classes.space}>Now Open!</div>
          </Box>
          :
          <Box display="flex" flexDirection="row" alignItems="center" width="20%">
            <FiberManualRecordIcon className={classes.closed} />
            <div className={classes.space}>Closed</div>
          </Box>}
      </Box>
      <Divider/>
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
            123 Fake Street, USA
          </Typography>
        </Box>
        <Box mb={5}>
          <Typography variant="h5" component="h3">
            Phone:
          </Typography>
          <Typography variant="h6">
            (555) 555-5555
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" component="h3">
           Website:
          </Typography>
          <Typography variant="h6">
            www.place.com
          </Typography>
        </Box>
      </Box>
      {/* <Box display="flex" flexDirection="column" width="33%">
            
          </Box> */}
      {/* <Box display="flex" flexDirection="column" width="33%">
            {hours ? <ListTimes hours={hours} /> : null}
          </Box> */}
      <Box display="flex" height="50%" flexDirection="row">




        {/* <Typography className={classes.pos} color="textSecondary">
            adjective
        </Typography> */}
        {/* <Typography variant="body2" component="p">
            well meaning and kindly.
          <br />
            {'"a benevolent smile"'}
          </Typography> */}
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