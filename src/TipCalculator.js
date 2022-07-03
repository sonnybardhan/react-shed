import React, { useState, useEffect } from 'react';

const calculatetip = (bill, tipPercent) => {
  return (bill * tipPercent * 0.01).toFixed(2);
};

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPercent, setTipPercent] = useState(18);
  const [numPeople, setNumPeople] = useState(1);

  let tip = (bill * tipPercent * 0.01).toFixed(2);
  let perHead = (tip / numPeople).toFixed(2);

  return (
    <>
      <>
        <label htmlFor='bill'>Bill</label>
        <input
          type='number'
          id='bill'
          min='0'
          value={bill}
          onChange={(e) => setBill(parseInt(e.target.value))}
        />
        <label htmlFor='tipPercentage'>Tip Percentage</label>
        <input
          type='number'
          id='tipPercentage'
          min='0'
          value={tipPercent}
          onChange={(e) => setTipPercent(parseInt(e.target.value))}
        />
        <label htmlFor='num-people'>Number of People</label>
        <input
          type='number'
          id='num-people'
          min='1'
          value={numPeople}
          onChange={(e) => setNumPeople(parseInt(e.target.value))}
        />
      </>
      <p>Total Tip: {isNaN(tip) ? '-' : `$${tip}`} </p>
      <p>Tip Per Person: {isNaN(perHead) ? '-' : `$${perHead}`}</p>
    </>
  );
}
