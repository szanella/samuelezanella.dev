import React from 'react';
import './Card.scss';

const Card = ({nRows, lastRowLength}) => (
  <div className='trello-card'>
    {
      [...Array(nRows - 1).fill(3)].concat(lastRowLength).map((rowLength, i) => (
        <div key={i} className={`card-line card-line--${rowLength}`}></div>
      ))
    }
  </div>
);

export default Card;
