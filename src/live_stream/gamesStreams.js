import React, { useState, useEffect } from 'react';
import api from "./api";
import { Link } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import ReactPlayer from "react-player";
import "../stream_games.css";
let interval;

function GameStreams ({match, location}) {
  console.log(match);
 
  const [streamData, setStreamData] = useState([])
  const [viewers, setViewers] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=512710`)
      console.log(result.data.data);
      let views = 0
      let dataArray = result.data.data
      let finalArray = dataArray.map (stream => {
        let newUrl = stream.thumbnail_url
          .replace('{width}', '300')
          .replace('{height}', '300')
        stream.thumbnail_url = newUrl
        views += stream.viewer_count
        return stream;
      })
     
      setStreamData(finalArray);
      setViewers(views)
    }

    
    fetchData();
    // interval = setInterval(() => {
    //   fetchData();
    // }, 10000);
    // return function cleanup () {
    //   clearInterval(interval)
    // }
  },[])
  return (
    <div style={{backgroundColor:"#222831", color:"#ffd369"}}>
      
      <h1 className='text-center'>Warzone Top 20 Streams</h1>
      <br></br>
      <h3 className='text-center'>
        <strong className='text-primary'>{viewers}  </strong>
        Currently watching Top 20 Warzone Streams on Twitch
      </h3>
      <div className='row'>
      {streamData.map(stream => (
        <div className='col-lg-4 col-md-6 col-sm-12 mt-5'>
        <div className='card1'>
           <Link
                className='card-img-top'
                to ={{
                  pathname:`/streams/game/${location.state.username}/` + stream.user_name,
                  state: {
                    username: stream.user_name,
                    views: stream.viewer_count,
                  }
                }}
              >
                <img className='card-img-top' src={stream.thumbnail_url} alt=""></img>
              </Link>
          {/* <img className='card-img-top' src={stream.thumbnail_url} alt=""></img> */}
          {/* <ReactPlayer
          style ={{width: 100}}
          url={`http://twitch.tv/${stream.user_name}`}
          /> */}
          <div className="card-body" style={{display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
            <div>
              <h5 className="card-title">{stream.user_name}</h5>
              <div className='card-text'>
                {stream.viewer_count} live Viewers
              </div>
            </div>
            

            <button className="btn btn-success">
           
              <Link
                className='link'
                to ={{
                  pathname:`/streams/game/${match.params.id}/` + stream.user_name,
                  state: {
                    username: stream.user_name,
                    views: stream.viewer_count,
                    time_started: stream.started_at
                  }
                }}
              >
                Watch {stream.user_name}'s stream {" "}
              </Link>
                
              
            </button>
          </div>
        </div>
      </div>
      ))}
      
    </div>
    </div>
      
    
    
  )
}

export default GameStreams;