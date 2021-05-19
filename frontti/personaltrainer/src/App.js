import './App.css';
import React, { useState } from 'react';
import ToolBar from '@material-ui/core/Typography';
//import Typography from '@material-ui/core/Typography'; hmmh
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GroupIcon from '@material-ui/icons/Group';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import TodayIcon from '@material-ui/icons/Today';
//import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import MyCalendar from './components/MyCalendar';
import { AppBar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

function App() {

  const classes = useStyles();
  const [value, setValue] = useState("customers");

  const handleChange = (event, value) => {
    setValue(value);
  }


  return (
    <div className="App">
      <AppBar position="relative" color="transparent">
        <ToolBar square className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<GroupIcon />} value="customers" label="CUSTOMERS" />
          <Tab icon={<DirectionsRunIcon />} value="trainings" label="TRAININGS" />
          <Tab icon={<TodayIcon />} value="calendar" label="CALENDAR" />
        </Tabs>
        </ToolBar>
      </AppBar>
      {value === 'customers' && <div><Customerlist /></div>}
      {value === 'trainings' && <div><Traininglist /></div>}
      {value === 'calendar' && <div><MyCalendar /></div>}
    </div>

  );
}

export default App;
