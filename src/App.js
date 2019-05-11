import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.containerStates = [
      'intro',
      'backend',
      'frontend',
      'ai'
    ];

    this.nShards = 11;

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

  componentDidMount() {
    const vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  render() {
    const {containerState} = this.state;

    return (
      <div className={`app ${this.state.containerState}`}>
        <div className='intro-text'>
          <h1>I am Samuele</h1>
        </div>

        <div className='intro-shards-container'>
          {
            // Generate nShards shards
            [...Array(this.nShards)].map((_, i) => (
              <div className='intro-shard-wrap' key={`intro-shard-${i}`}>
                <div className='intro-shard'></div>
              </div>
            ))
          }
        </div>

        <div className='shards-container'
             tabIndex={1}
             onKeyUp={this.handleKeypress}
             onClick={this.toState}>
          {
            // Generate nShards shards
            [...Array(this.nShards)].map((_, i) => (
              <div className='shard-wrap' key={`shard-${i}`}>
                <div className='shard'></div>
              </div>
            ))
          }
        </div>
        <div className='caption'>
          <h2 className={ containerState === 'backend' ? 'up' : 'down' }>I do Backend</h2>
          <h2 className={ containerState === 'frontend' ? 'up' : 'down' }>I do Frontend</h2>
          <h2 className={ containerState === 'ai' ? 'up' : 'down' }>I do Artificial Intelligence</h2>
        </div>
      </div>
    )
  }
}

export default App;
