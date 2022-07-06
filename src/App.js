import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

function App() {
  const [data, setStorageData] = useLocalStorage('test', 'hello world');
  // const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleUpdate = () => {
    setStorageData(value);
    setValue('');
  };

  return (
    <>
      <h1>Use Local Storage</h1>

      <label htmlFor='value'>Change Value</label>
      <br />
      <input
        type='text'
        id='value'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <br />
      <button onClick={handleUpdate}>update storage</button>
      <div className='App'>{data}</div>
    </>
  );
}

export default App;
