import React from 'react';

const ExtLink = ({children, ...props}) => (
  <a target='_blank'
     rel='noopener noreferrer'
     onClick={e => e.stopPropagation()}
     {...props}>
    {children}
  </a>
);

export default ExtLink;
