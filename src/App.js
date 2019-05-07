import React from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerState: 1
    };

    this.toNextState = this.toNextState.bind(this);
  }

  componentDidMount() {
    // this.interval = setInterval(this.toNextState, 1500);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  toNextState() {
    const nextContainerState = this.state.containerState === 2 ? 1 : this.state.containerState + 1;

      this.setState({
        containerState: nextContainerState
      });
  }

  render() {
    return (
      <div className="app">
        <div className={`shards-container state-${this.state.containerState}`} onClick={this.toNextState}>
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
};

export default App;
