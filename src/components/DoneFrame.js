import React from 'react';

const DoneFrame = props => (
  <div className="text-center">
    <h2>{props.gameStatus}</h2>
    <button className="btn btn-secondary" onClick={props.restartGame}>Play Again</button>
  </div>
);

export default DoneFrame;
