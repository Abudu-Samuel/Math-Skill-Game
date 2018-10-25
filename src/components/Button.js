import React from 'react';

const Button = (props) => {
  let button;

  switch (props.answerIsCorrect) {
  case true:
    button = <button className="btn btn-sm btn-success" onClick={() => props.acceptAnswer()}>
      <i className="fa fa-check" />
    </button>;
    break;
  case false:
    button = <button className="btn btn-sm btn-danger">
      <i className="fa fa-times" />
    </button>;
    break;
  default:
    button = <button className="btn btn-sm warning" onClick={props.checkAnswer}
      disabled={props.selectedNumbers.length === 0}>=</button>;
  }

  return (
    <div className="col-md-3 text-center">
      {button}
      <br /> <br />
      <button className="btn btn-sm warning text-white" disabled={props.refreshNumberOfTimes === 0} onClick={props.refreshGame}>
        <i className="fa fa-refresh" />{' '}{props.refreshNumberOfTimes}
      </button>
    </div>
  );
};

export default Button;
