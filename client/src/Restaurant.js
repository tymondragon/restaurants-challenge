import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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

function Restaurant ({ restaurant }) {
  const classes = useStyles();
  const hours = restaurant.hoursOfOperation
  console.log(restaurant)
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column" width="33%">
            <Typography variant="h6" component="h2">
              {restaurant.name}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              Rating: {restaurant.rating}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" width="33%">
            {hours ? <ListTimes hours={hours} /> : null}
          </Box>
          <Box width="33%">
            {restaurant.openNow ? <Box display="flex" flexDirection="row">
              <FiberManualRecordIcon className={classes.open} />
              <div className={classes.space}>Now Open!</div>
            </Box>
           :
              <Box display="flex" flexDirection="row">
                <FiberManualRecordIcon className={classes.closed} />
                <div className={classes.space}>Closed</div>
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

function ListTimes ({ hours}) {
  return (
      <List component="nav" aria-label="contacts">
        {hours.map((time, i) => {
          return (
            <ListItem key={i} >
              <ListItemText primary={time} />
            </ListItem>)
        })}
      </List>
  )
}

export default Restaurant;