import React, { useState, useEffect } from 'react';

const calculatetip = (bill, tipPercent) => {
  return (bill * tipPercent * 0.01).toFixed(2);
};

export default function TipCalculator() {
  // Write your code here.
  const [bill, setBill] = useState(50);
  const [tipPercent, setTipPercent] = useState(18);
  const [numPeople, setNumPeople] = useState(1);
  const [totalTip, setTotalTip] = useState('');
  const [tipPerPerson, setTipPerPerson] = useState('');

  useEffect(() => {
    if (Number(bill) && Number(tipPercent) && Number(numPeople)) {
      let tip = (bill * tipPercent * 0.01).toFixed(2);
      setTotalTip('$' + tip);
      let perHead = (tip / numPeople).toFixed(2);
      setTipPerPerson('$' + perHead);
    } else {
      setTotalTip('-');
      setTipPerPerson('-');
    }
  }, [bill, tipPercent, numPeople]);

  return (
    <>
      <div>
        <label htmlFor='bill'>Bill</label>
        <input
          type='number'
          id='bill'
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
        <label htmlFor='tipPercentage'>Tip Percentage</label>
        <input
          type='number'
          id='tipPercentage'
          value={tipPercent}
          onChange={(e) => setTipPercent(Number(e.target.value))}
        />
        <label htmlFor='num-people'>Number of People</label>
        <input
          type='number'
          id='num-people'
          value={numPeople}
          onChange={(e) => setNumPeople(Number(e.target.value))}
        />
      </div>
      <p>Total Tip: {totalTip}</p>
      <p>Tip Per Person: {tipPerPerson}</p>
    </>
  );
}
