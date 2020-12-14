import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';






// ####################### GUNS #########################
// res.data.weapon_assault_rifle

export default function App() {
  const [state, setState] = useState({
    guns: [],
    kills: [],
    deaths: [],
    kdRatio: [],
    hits: [],
    shots: [],
    value: ["iw8_ar_falima"],
  })

  useEffect(() => {
    console.log("In Axios");
    axios
      .get('http://localhost:8080/g')
      .then(res => {
        console.log(res, "=-=-=-=-=-=")
        const guns = state.value
        const deaths = res.data.weapon_assault_rifle[guns].properties.deaths
        const hits = res.data.weapon_assault_rifle[guns].properties.hits
        const kills = res.data.weapon_assault_rifle[guns].properties.kills
        const kdRatio = res.data.weapon_assault_rifle[guns].properties.kdRatio
        const shots = res.data.weapon_assault_rifle[guns].properties.shots

        setState(prev => ({
          ...prev,
          guns: guns,
          kills: kills,
          deaths: deaths,
          kdRatio: kdRatio,
          hits: hits,
          shots: shots
        }))
      })
      .catch(error => {
        console.log(error);
      })
  }, [state.guns])

  const submitForm = (event) => {
    setState(prev => ({
      ...prev,
      guns: state.value
    }))
    event.preventDefault();
  }
  return (
    <div>
      <p>kills {state.kills}</p>
      <p>guns {state.guns}</p>
      <p>deaths {state.deaths}</p>
      <p>kdRatio {state.kdRatio}</p>
      <p>shots {state.shots}</p>
      <p>hits {state.hits}</p>
      <br/>
      <form onSubmit={submitForm}>
        <label>
          ENTER GUN
          <br/>
          <input type="text" value={state.value}
            onChange={event => setState(prev => ({
              ...prev,
              value: event.target.value
            }))}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}