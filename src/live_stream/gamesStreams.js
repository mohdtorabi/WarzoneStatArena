// react import
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// local imports and styling
import api from "./api";
import "../styles/stream_games.css";
// material UI imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { makeStyles } from "@material-ui/core/styles";

// inteval variable is for grabbing total viewers faster(commented out for now due to limited allowed calls)
let interval;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
      marginRight: 0,
      height: 55,
      backgroundColor: "#fff",
      color: "white",
    },
  },

  button: {
    width: 52,
    height: 55,
    color: "#fff",
    backgroundColor: "#dea01e",
    marginLeft: "0.5%",
  },
  text: {
    backgroundColor: "#fff",
  },
}));

const GameStreams = ({ match, location }) => {
  const classes = useStyles();
  //  setting state for Game Streamers Data from Twitch API
  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);
  const [state, setState] = useState("");

  // axios call to twitch API
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`
      );

      let views = 0;
      let dataArray = result.data.data;

      // looping through Warzone Top 20 Live Streamers on Twitch
      let finalArray = dataArray.map((stream) => {
        let newUrl = stream.thumbnail_url
          .replace("{width}", "300")
          .replace("{height}", "300");
        stream.thumbnail_url = newUrl;
        views += stream.viewer_count;
        return stream;
      });

      setStreamData(finalArray);
      setViewers(views);
    };

    fetchData();
    // making total views update every interval(milliseconds).

    // interval = setInterval(() => {
    //   fetchData();
    // }, 10000);
    // return function cleanup () {
    //   clearInterval(interval)
    // }
  }, []);

  const enter = (key) => {
    if (key === "Enter") {
      console.log("do validate");
    }
  };
  return (
    <div style={{ backgroundColor: "#191d24", color: "#dea01e" }}>
      <h1 className="text-center">Warzone Top 20 Streams</h1>
      <br></br>
      <h3 className="text-center">
        <strong className="text-primary">{viewers} </strong>
        Currently watching Top 20 Warzone Streams on Twitch
      </h3>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <TextField
          id="filled"
          label="Twitch Search"
          variant="filled"
          style={{ borderRadius: "10px", width: "400px" }}
          onKeyDown={(e) => enter(e)}
          className={classes.text}
          onChange={(e) => setState(e.target.value)}
        />
        <Button
          href={`https://www.twitch.tv/search?term=${state}`}
          className={classes.button}
          target={"_blank"}
          type={"submit"}
        >
          <ArrowIcon fontSize="inherit" />
        </Button>
      </div>

      <div className="row">
        {streamData.map((stream) => (
          <div className="col col-lg-4 col-md-6 col-sm-12 mt-5">
            <div className="card1">
              <Link
                className="card-img-top"
                to={{
                  pathname:
                    `/streams/game/${location.state.gameName}/` +
                    stream.user_name,
                  state: {
                    gamerName: stream.user_name,
                    views: stream.viewer_count,
                  },
                }}
              >
                <img
                  className="card-img-top"
                  src={stream.thumbnail_url}
                  alt=""
                ></img>
              </Link>
              <div
                className="card-body"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h5 className="card-title">{stream.user_name}</h5>
                  <div className="card-text">
                    {stream.viewer_count} live Viewers
                  </div>
                </div>

                <button className="btn btn-success">
                  <Link
                    className="link"
                    to={{
                      pathname:
                        `/streams/game/${match.params.id}/` + stream.user_name,
                      state: {
                        gamerName: stream.user_name,
                        views: stream.viewer_count,
                        time_started: stream.started_at,
                      },
                    }}
                  >
                    Watch{" "}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStreams;
