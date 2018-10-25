import React from 'react';
import lodash from 'lodash';

const Stars = props => (
  <div className="col-md-5">
    {
      lodash.range(props.numberOfStars).map(i => (<i key={i} className="fa fa-star animated heartBeat infinite" />))
    }
  </div>
);
export default Stars;
