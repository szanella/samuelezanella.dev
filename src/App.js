import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.containerStates = [
      'backend',
      'frontend',
      'ai'
    ];

    this.nShards = 7;

    this.state = {
      containerState: this.containerStates[0]
    };

    this.toState = this.toState.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleKeypress(event) {
    if (event.key === 'ArrowRight') {
      this.toState(true);
    } else if (event.key === 'ArrowLeft') {
      this.toState(false);
    }
  }

  toState(next = true) {
    const currentIndex = this.containerStates.indexOf(this.state.containerState);
    const totStates = this.containerStates.length;

    // Rotate the state index between 0 and the number of states - 1
    this.setState({
      containerState: this.containerStates[next ?
        (currentIndex + 1) % totStates :
        (currentIndex + totStates - 1) % totStates]
    });
  }

  render() {
    return (
      <div className="app">
        <div tabIndex={1}
             onKeyUp={this.handleKeypress}
             onClick={this.toState}
             className={`shards-container ${this.state.containerState}`}>
          {
            // Generate nShards shards
            [...Array(this.nShards)].map(() => (
              <div className='shard-wrap'>
                <div className='shard'></div>
              </div>
            ))
          }

        </div>
      </div>
    )
  }
}

export default App;
