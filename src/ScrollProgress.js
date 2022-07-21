import React from 'react';

const ScrollProgress = ({ done = 10 }) => {
  const scrollStyle = {
    width: '100%',
    height: '2rem',
    backgroundColor: 'black',
    position: 'sticky',
    zIndex: 100,
    top: 0,
    left: 0,
  };

  const progressStyle = {
    width: `${done}%`,
    height: '100%',
    backgroundColor: 'pink',
  };

  return (
    <div className='scroll-bar-background' style={scrollStyle}>
      <div className='scroll-bar-progress' style={progressStyle}></div>
    </div>
  );
};

export default ScrollProgress;
