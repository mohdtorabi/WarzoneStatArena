import React from 'react'
import Container from '@material-ui/core/Container';
import WeeklyStatCard from './WeeklyStatCard';
import LifetimeStatCard from './LifetimeStatCard';

export default function GamerStats(props) {
  /** THIS IS WHERE WE WILL SHOW THE GAMER'S WEEKLY AND LIFETIME STATS next to the favourited guns */
  const { weeklyData, lifetimeData } = props;
  console.log('weekly data: ', weeklyData)
  return (
    <div className='gamer-stats'>
      <Container maxWidth="false">
        <div className='weekly-stats'>
          <br></br>
          <h1>Weekly Game Stats</h1>
          <WeeklyStatCard 
          weeklyData = {weeklyData}
          />
        </div>
      </Container>
      <Container maxWidth="false">
        <div className='lifetime-stats'>
          <h1>Lifetime Game Stats</h1>
          <LifetimeStatCard 
          lifetimeData = {lifetimeData}
          />
        </div>
      </Container>
    </div>
  );
};