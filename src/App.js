import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerState: 1
    };

    this.toState = this.toState.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    // this.interval = setInterval(this.toNextState, 1500);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  handleKeypress(event) {
    if (event.key === 'ArrowRight') {
      this.toState(true);
    } else if (event.key === 'ArrowLeft') {
      this.toState(false);
    }
  }

  toState(next = true) {
    let nextContainerState;
    if (next) {
      nextContainerState = this.state.containerState === 3 ? 1 : this.state.containerState + 1;
    } else {
      nextContainerState = this.state.containerState === 1 ? 3 : this.state.containerState - 1;
    }

    this.setState({
      containerState: nextContainerState
    });
  }

  render() {
    return (
      <div className="app">
        <div tabIndex={1}
             onKeyUp={this.handleKeypress}
             onClick={this.toState}
             className={`shards-container state-${this.state.containerState}`}>
          <div className='shard-wrap'>
            <div className='shard'></div>
          </div>
          <div className='shard-wrap'>
            <div className='shard'></div>
          </div>
          <div className='shard-wrap'>
            <div className='shard'></div>
          </div>
          <div className='shard-wrap'>
            <div className='shard'></div>
          </div>
          <div className='shard-wrap'>
            <div className='shard'></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
