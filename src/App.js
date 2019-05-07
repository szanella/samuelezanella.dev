import React from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerState: 1
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const timestamp = (new Date()).getTime();
      const nextContainerState = this.state.containerState === 2 ? 1 : this.state.containerState + 1;

      this.setState({
        containerState: nextContainerState
      });
    }, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="app">
        <div className={`shards-container state-${this.state.containerState}`}>
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
