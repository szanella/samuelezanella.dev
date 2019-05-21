import React from 'react';

const Caption = ({shown, predicate, subject, onClick, children}) => (
  <div className={ shown ? 'up' : 'down'} onClick={onClick}>
    <div className='caption-arrow'></div>
    <h2>I {predicate} <span className='accent'>{subject}</span></h2>
  </div>
);

export default Caption;
