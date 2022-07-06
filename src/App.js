import { useState } from 'react';
import useStateWithHistory from './useStateWithHistory';

function App() {
  const [value, setValue, goBack, goFoward, history] = useStateWithHistory(10);
  const [input, setInput] = useState('');

  const sendInput = () => {
    setValue(input);
    setInput('');
    console.log('Input sent');
  };

  return (
    <div className='App'>
      <h1>useStateWithHistory check</h1>
      <div>
        <strong>Value: </strong>
        <br />
        {value}
        <br />
        <strong>History: </strong>
        <br />
        {history.map((value) => (
          <p key={Math.random() * 99}>{value}</p>
        ))}
        <br />
      </div>
      <div>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter input'
        />
        <button onClick={sendInput}>Send</button>
        <button onClick={() => goBack()}>back</button>
        <button onClick={() => goFoward()}>forward</button>
      </div>
    </div>
  );
}

export default App;
