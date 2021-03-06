/** React Imports */
import React, { useState } from 'react';

/** Material UI Imports */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#2A313C',
  },
  tab: {
    color: '#DADADA',
    '&:hover': {
      fontWeight: 'bold',
    },
    '&:focus': {
      fontWeight: 'bold',
    },
  },
});

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const chosenTab = (e, newTab) => {
    setTab(newTab);
    props.onSelect(newTab) ;
  };
  
  return (
    <Paper className={classes.root}>
      <Tabs
        TabIndicatorProps={{style: {backgroundColor: "#ffd369"}}}
        value={tab}
        onChange={chosenTab}
        centered
      >
        <Tab className={classes.tab} label="Overview" />
        <Tab className={classes.tab} label="Guns" />
        <Tab className={classes.tab} label="Game Modes" />
      </Tabs>
    </Paper>
  );
};