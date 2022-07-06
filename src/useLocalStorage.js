import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue = '') {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const res = getLSData();
    if (res) {
      setData(res);
    } else {
      setLSData(data);
    }
  }, []);

  function getLSData() {
    return JSON.parse(localStorage.getItem(key));
  }

  function setLSData(value) {
    localStorage.setItem(key, JSON.stringify(value));
    setData(value);
  }

  return [data, setLSData];
}

// Do not edit the line below.
// exports.useLocalStorage = useLocalStorage;
