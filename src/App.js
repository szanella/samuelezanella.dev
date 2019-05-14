import React from 'react';
import './App.scss';
import ExtLink from './ExtLink';
import handCursor from './assets/svg/hand-cursor.svg';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.containerStates = [
      'intro',
      'frontend',
      'backend',
      'ai',
      'contacts'
    ];

    this.nShards = 11;

    this.state = {
      containerState: null
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

  setHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  componentDidMount() {
    this.setHeight();
    window.addEventListener('resize', this.setHeight);

    setTimeout(() => this.setState({containerState: this.containerStates[0]}), 100);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight);
  }

  render() {
    const {containerState} = this.state;

    return (
      <div className={`app ${this.state.containerState}`}
           ref={appDiv => appDiv && appDiv.focus()}
           tabIndex={1}
           onKeyUp={this.handleKeypress}
           onClick={this.toState}>
        <div className='intro-text'>
          <h1>My name is</h1>
          <h1 className='name'>Samuele</h1>

          <p>Full Stack Developer based in Italy</p>
          <p>Currently working for <ExtLink href='https://moku.io'>moku</ExtLink></p>
        </div>

        <div className='shards-container'>
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
          <div className={containerState === 'frontend' ? 'up' : 'down'}>
            <p>up</p>
            <h2>I do <span className='accent'>Frontend</span></h2>
          </div>
          <div className={containerState === 'backend' ? 'up' : 'down'}>
            <p>up</p>
            <h2>I do <span className='accent'>Backend</span></h2>
          </div>
          <div className={containerState === 'ai' ? 'up' : 'down'}>
            <p>up</p>
            <h2>I do <span className='accent'>Artificial Intelligence</span></h2>
          </div>
        </div>

        <div className='contacts'>
          <p>Find me here:</p>
          <p><ExtLink href='https://www.linkedin.com/in/samuele-zanella/'>LinkedIn</ExtLink></p>
          <p><ExtLink href='https://github.com/szanella'>GitHub</ExtLink></p>
          <p><ExtLink href='mailto:hello@samuelezanella.dev'>hello@samuelezanella.dev</ExtLink></p>
        </div>
        <img className='tutorial' src={handCursor} />

      </div>
    )
  }
}

export default App;
