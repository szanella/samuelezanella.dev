import React from 'react';

const Caption = ({shown, predicate, subject, onClick, expanded, children}) => (
  <div onClick={e => e.stopPropagation()} className={`caption ${shown ? 'up' : 'down'} ${expanded && shown ? 'expanded' : ''}`}>
    <div className='caption-arrow'></div>
    <div className='caption-heading' onClick={onClick}>
      <h2>I {predicate} <span className='accent'>{subject}</span></h2>
    </div>
    <div className='caption-text'>
      {children}
    </div>
  </div>
);

export default Caption;
