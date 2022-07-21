import { useEffect, useState } from 'react';
import './App.css';
import ScrollProgress from './ScrollProgress';
import Text from './Text';

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.addEventListener('scroll', () => handleScroll(setProgress));
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='App'>
      <ScrollProgress done={progress} />
      <h1>Scroll progress indicator</h1>
      <div className='text-body'>
        <Text />
        <Text />
        <Text />
      </div>
    </div>
  );
}

export default App;

function handleScroll(setProgress) {
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollRemaining = scrollHeight - clientHeight;
  const progress = Math.round((scrollTop / scrollRemaining) * 100);
  // const progress = (scrollTop / scrollRemaining) * 100;

  // console.log('progress: ', progress);
  setProgress(progress);
  // return progress;
}
