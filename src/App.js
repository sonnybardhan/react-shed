import useWindowSize from './useWindowSize';

function App() {
  const { width, height } = useWindowSize();

  return (
    <div className='App'>
      <div>Hello world</div>
      <div>Width: {width}</div>
      <div>Height: {height}</div>
    </div>
  );
}

export default App;
