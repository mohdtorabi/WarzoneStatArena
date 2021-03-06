import React from 'react'

export default function CreatedSmallOverlay(props) {
  const {
    statName1,
    statValue1,
    statName2,
    statValue2,
    statName3,
    statValue3,
    statName4,
    statValue4,
    statName5,
    statValue5,
    statName6,
    statValue6,
    statName7,
    statValue7,
    statName8,
    statValue8,
  } = props


  // This is the FINISHED overlay what the user has MADE
  
  // we use a ternary to see if the number has floating decimal spots some can be quite like like 
  // headshotPercentage 13.2345236236236% will be fixed to 13.23%

  return (
    <div>
      <div className="created-large-bar">
        <div className="stats-large-bar">
          <div className="stats1">
            <div className="overlay-title1">{statName1}</div>
            <div className="overlay-stat1">{Number.isInteger(statValue1) ? statValue1 : statValue1.toFixed(2)}</div>
          </div>
          <div className="stats1">
            <div className="overlay-title1">{statName2}</div>
            <div className="overlay-stat1">{Number.isInteger(statValue2) ? statValue2 : statValue2.toFixed(2)}</div>
          </div>
          <div className="stats1">
            <div className="overlay-title1">{statName3}</div>
            <div className="overlay-stat1">{Number.isInteger(statValue3) ? statValue3 : statValue3.toFixed(2)}</div>
          </div>
          <div className="stats1">
            <div className="overlay-title1">{statName4}</div>
            <div className="overlay-stat1">{Number.isInteger(statValue4) ? statValue4 : statValue4.toFixed(2)}</div>
          </div>
          <div className="stats1">
            <div className="overlay-title1">{statName5}</div>
            <div className="overlay-stat1">{Number.isInteger(statValue5) ? statValue5 : statValue5.toFixed(2)}</div>
          </div>
          <div className="stats1">
            <div className="overlay-title1">{statName6}</div>
            <div className="overlay-stat1">{Number.isInteger(statValue6) ? statValue6 : statValue6.toFixed(2)}</div>
          </div>
          <div className="stats1">
            <div className="overlay-title1">{statName7}</div>
            <div className="overlay-stat1">{Number.isInteger(statValue7) ? statValue7 : statValue7.toFixed(2)}</div>
          </div>
          <div className="stats1">
            <div className="overlay-title1">{statName8}</div>
            <div className="overlay-stat1">{Number.isInteger(statValue8) ? statValue8 : statValue8.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
