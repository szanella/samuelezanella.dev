import React from 'react';

const Caption = ({shown, predicate, subject, children}) => (
  <div className={ shown ? 'up' : 'down'}>
    <h2>I {predicate} <span className='accent'>{subject}</span></h2>

  </div>
);

export default Caption;
