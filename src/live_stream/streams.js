import React from 'react'
import ReactPlayer from "react-player"


function Streams ({match, location}) {
  console.log(location.state.views);
  console.log(match.params);
  return ( 
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", color:"rgb(255, 211, 105)"}}>
      <h1 style={{fontSize:"30px", marginTop:"30px"}}>Watching {match.params.id}'s Stream</h1>
      <h2 style={{margin: "40px"}}>
        <strong className='text-primary'>{location.state.views}</strong> Viewers
      </h2>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", }}>
        <ReactPlayer 
          url={`http://twitch.tv/${location.state.username}`}
        />
      </div>
    </div>
    
  )
}

export default Streams;