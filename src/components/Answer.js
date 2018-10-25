import React from 'react';

const Answer = props => (
  <div className="col-md-4">
    {
      props.selectedNumbers.map((number, i) => (
        <span key={i} onClick={() => props.unSelectNumber(number)}>{number}</span>
      ))
    }
  </div>
);

export default Answer;
