import React from 'react';
import './Card.scss';

const Card = ({nRows, lastRowLength, assigned}) => (
  <div className='trello-card'>
    {
      [...Array(nRows - 1).fill(3)].concat(lastRowLength).map((rowLength, i) => (
        <div key={i} className={`card-line card-line--${rowLength}`}></div>
      ))
    }
    { assigned && <div className='trello-user'></div>}
  </div>
);

export default Card;
