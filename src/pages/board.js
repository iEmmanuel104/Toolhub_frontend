import React, { useState } from 'react'
import Profiles from '../components/profiles';
import { Leaderboard } from '../components/database';

export default function Board() {

    const [period, setPeriod] = useState(0);

  const handleClick = (e) => {
     
    setPeriod(e.target.dataset.id)
  }

  return (
    <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

        <div className="duration">
            <button onClick={handleClick} data-id='15'>15 Days</button>
            <button onClick={handleClick} data-id='30'>30 Days</button>
            <button onClick={handleClick} data-id='0'>All-Time</button>
        </div>
        <div className="profilesboard">
            <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
        </div>
    </div>
  )
}



function between(data, between){
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data.filter(val => {
        let userDate = new Date(val.dt);
        if (between === 0) return val;
        return previous <= userDate && today >= userDate;
    })

    // sort with descending order
    return filter.sort((a, b) => {
        if ( a.score === b.score){
            return a.score - b.score;
        } else{
            return a.score - b.score;
        }
    })

}