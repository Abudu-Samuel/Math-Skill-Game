import React from 'react';
import lodash from 'lodash';


const Numbers = (props) => {
  Numbers.list = lodash.range(1, 10);
  const numberClassName = (number) => {
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
  };

  return (
    <div className="card hoverable wid text-center">
      <div>
        {
          Numbers.list.map((number, i) => (<span key={i} className={numberClassName(number)}
            onClick={() => props.handleClick(number)}>{number}</span>))
        }
      </div>

    </div>
  );
};

export default Numbers;
