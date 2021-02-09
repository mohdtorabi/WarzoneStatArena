//react imports
import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

// material UI imports
import Grid from "@material-ui/core/Grid";

// local imports and styling
import GamerTagInput from "../Home/GamerTagInput";
import PlatformButtons from "../Home/Platform";
import Blogs from "../Home/Blog";
import StreamLeaderBoard from "../Home/StreamLeaderBoard";
import TopAchievers from "../Home/TopAchievers";
import useApplicationData from "../hooks/useApplicationData";
import codLogo from "../img/cod-logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#191d24",
    
  },
  paper: {
    margin: 0,
    color: theme.palette.text.secondary,
    textAlign: "center",
    height: 500,
    display: "flex",
    justifyContent: "space-evenly",
  },
  shoot: {
    background: "#a970ff",
    borderRadius: 3,
    border: 0,
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    fontFamily: "Lucidatypewriter, monospace",
    width: "350px",
    height: 45,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: "20px",
  },
  label: {
    textTransform: "capitalize",
  },
  img: {
    height: 40,
    width: 45,
    paddingLeft: 10,
  },
  gameId: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#dea01e",
    // marginTop: "1%",
    marginLeft: "1%",
  },
  title1: {
    fontSize: 30,
    color: "#dea01e",
    marginLeft: "1%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
      width: '80%'
    }
    
  },
  warzoneImg: {
    height: 200,
    width: 420,
    marginTop: "2%",
  },
  gamerInputArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  gamerAreaTitle: {
    color: "#dea01e",
    // marginTop: "-2%",
    fontSize: "22px",
  },
  gamerInfo: {
    display: "flex",
    marginTop: "-15%",
  },
  leaderboard: {
    width: "100%",
    height: "fit-content",
    marginTop: "2%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  blog: {
    width: "100%",
    height: "fit-content",
    marginTop: "-2%",
    paddingBottom: "3%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [apiError, setApiError] = useState("");
  const { state, setState, setGamerData } = useApplicationData();

  // setting gamer tag from text Field Input
  const setName = (event) => {
    setState((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const checkTagAndPlatformEntered = (event) => {
    if (state.name && state.platform) {
      const gamerTag = state.name.replace("#", "%23").replace(" ", "%20");
      const gamerPlatform = state.platform;
      axios
        .get(`http://localhost:3030/stats/${gamerTag}&${gamerPlatform}`)
        .then((res) => {
          if (res.data[5].error) {
            setApiError(res.data[5].error);
            setState((prev) => ({
              ...prev,
              name: "",
            }));
          } else {
            setGamerData();
          }
        });
    } else {
      setApiError("no input");
      // history.go(0);
    }
  };

  // setting state of Platform
  const setPlatform = (platform) => {
    setState((prev) => ({
      ...prev,
      platform,
    }));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <div className={classes.header}>
          <img className={classes.warzoneImg} src={codLogo} alt="" />

          <div className={classes.gamerInputArea}>
            <div>
              <h1 className={classes.gamerAreaTitle}>
                Enter Your Modern Warfare Gamer ID
              </h1>
            </div>
            <div className={classes.gamerInfo}>
              <div className={classes.gameId}>
                {/* platform component */}
                <PlatformButtons onClick={setPlatform} />
                {/* textfield component */}
                <GamerTagInput
                  value={state.name}
                  onChange={setName}
                  onClick={checkTagAndPlatformEntered}
                  error={apiError}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.leaderboard}>
          <StreamLeaderBoard />
          <TopAchievers />
        </div>

        <div className={classes.blog}>
          <Blogs
            url="https://youtu.be/hi7DrHz6g9c"
            title='Call of Duty: Warzone Supposedly Has a New "Broken" OP Gun'
            avatar="RS"
            subheader="By Mike Hume"
            link="https://www.washingtonpost.com/video-games/tips/best-cold-war-loadouts-warzone/"
            text="Beyond a slew of bugs that allowed players to turn invisible or infinitely heal themselves outside of “Warzone’s” shrinking gas circle, the integration of “Call of Duty: Black Ops Cold War’s” weaponry created a number of questions about the effectiveness of attachments (which are unique to “Cold War” guns) and how they stacked up against traditional “Warzone” loadouts based off “Call of Duty: Modern Warfare’s” guns. Then people discovered the DMR-14. The emphasis on the DMR meant few players were scrutinizing the other new weapons. And while some, like the Mac-10 submachine gun and the Diamatti burst pistol, became secondary weapons for DMR users, few were paying attention to “Cold War’s” other possibilities. Now that the DMR has (mercifully) been nerfed and the meta has rebalanced, there are still a lot of questions about what “Cold War” guns are best. We’re here to provide some answers."
          />
          <Blogs
            url="https://www.youtube.com/watch?v=nEJD_q21vCM"
            title="FaZe Swagg reveals a gun better than DMR-14 in Warzone"
            avatar="MT"
            subheader="By Lloyd Coombes "
            link="https://www.gamesradar.com/best-call-of-duty-warzone-guns/"
            text="The best Warzone guns have seen a boost recently, with the integration of Black Ops Cold War into Call of Duty Warzone. This influx of new weapons means there is a slew to choose from for practically any playstyle, including the existing ones from Call of Duty Modern Warfare.
                  While there are a ton of guns at your disposal, there are a handful that stand above the rest, which is where this guide to the Warzone best guns comes in. If you want to compete with skilled players, you’ll need to use top-tier weapons and loadouts that are ideal in all situations. From snipers to SMGs, and even light machine guns, these are the best guns in Warzone."
          />
        </div>
      </Grid>
    </div>
  );
}
