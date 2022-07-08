import React, { useState, useEffect } from 'react';

const TILE_COLORS = ['red', 'green', 'blue', 'yellow'];

export default function Memory() {
  const [heading, setHeading] = useState('Memory');
  const [tileColors, setTileColors] = useState([
    ...TILE_COLORS,
    ...TILE_COLORS,
  ]);
  const [tilesToDisplay, setTilesToDisplay] = useState([]);
  const [canSelect, setCanSelect] = useState(true);
  const [nextIdxCheck, setNextIdxCheck] = useState(1);
  const [gameOver, SetGameOver] = useState(false);

  const initGame = () => {
    setTileColors(shuffle([...tileColors]));
    SetGameOver(false);
    setHeading('Memory');
    setNextIdxCheck(1);
    setCanSelect(true);
    setTilesToDisplay([]);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (nextIdxCheck > tileColors.length) {
      SetGameOver(true);
      setCanSelect(false);
      setHeading('You Win!');
    }
  }, [nextIdxCheck]);

  const compareColors = () => {
    const previousIdx = tilesToDisplay[nextIdxCheck - 1];
    const lastIdx = tilesToDisplay[nextIdxCheck];
    const previousColor = tileColors[previousIdx];
    const lastColor = tileColors[lastIdx];
    return previousColor === lastColor;
  };

  useEffect(() => {
    if (tilesToDisplay.length === nextIdxCheck + 1) {
      if (compareColors()) {
        setNextIdxCheck((prevIdx) => prevIdx + 2);
      } else {
        setCanSelect(false);
        setTimeout(() => {
          removeFromTilestoDisplay();
          setCanSelect(true);
        }, 1000);
      }
    }
  }, [tilesToDisplay]);

  const addToTilesToDisplay = (idx) => {
    const temp = [...tilesToDisplay];
    temp.push(idx);
    setTilesToDisplay(temp);
  };

  const removeFromTilestoDisplay = () => {
    const temp = [...tilesToDisplay];
    temp.pop();
    temp.pop();
    setTilesToDisplay(temp);
  };

  const Tile = ({ idx }) => {
    let className = 'tile';

    if (tilesToDisplay.includes(idx)) {
      className = `tile ${tileColors[idx]}`;
    }

    return (
      <div
        className={className}
        onClick={() => {
          if (idx === tilesToDisplay[tilesToDisplay.length - 1]) return;
          if (tilesToDisplay.includes(idx)) return;
          if (canSelect) {
            addToTilesToDisplay(idx);
          }
        }}
      ></div>
    );
  };

  return (
    <>
      <h1>{heading}</h1>
      <div className='board'>
        {tileColors.map((color, idx) => (
          <Tile css={color} key={color + idx} idx={idx} />
        ))}
      </div>
      <button
        style={{ display: gameOver ? 'block' : 'none' }}
        onClick={() => initGame()}
      >
        Resart
      </button>
    </>
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
