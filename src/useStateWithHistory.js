import { useState, useRef, useEffect } from 'react';

export default function useStateWithHistory(initialState) {
  const [state, setState] = useState(initialState);
  const history = useRef([state]);
  const idx = useRef(0);

  const setValue = (data) => {
    setState(data);
    history.current.push(data);
    idx.current = history.current.length - 1;
  };

  const goBack = () => {
    if (idx.current === 0) return;
    idx.current -= 1;
    setState(history.current[idx.current]);
  };

  const goForward = () => {
    if (idx.current >= history.current.length - 1) return;

    idx.current += 1;
    setState(history.current[idx.current]);
  };

  return [state, setValue, goBack, goForward, history.current];
}
