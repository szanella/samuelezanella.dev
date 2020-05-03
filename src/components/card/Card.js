import React, {Component} from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nRows: Math.random()
    }
  }
}

export default Card;
