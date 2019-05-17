import React from 'react';
import './App.scss';
import ExtLink from './ExtLink';
import handCursor from './assets/svg/hand-cursor.svg';
import {concatMap, delay, scan} from 'rxjs/operators';
import {of, concat} from 'rxjs';

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

    this.terminalSub = null;
    this.terminalPrefix = (folder = '~') => `samuelezanella:${folder} user $ `;
    this.terminalOutput = [
      {
        prefix: this.terminalPrefix(),
        command: 'cd Repos/my_rails_project'
      },
      {
        prefix: this.terminalPrefix('my_rails_project'),
        command: 'rails c'
      },
      {
        prefix: '2.6.3 :001 > ',
        command: 'MyModel.create(column1: "val")'
      },
      {
        output: '=> #<MyModel id: 1, column1: "val">'
      },
      {
        prefix: '2.6.3 :002 > ',
        command: 'exit'
      },
      {
        prefix: this.terminalPrefix('my_rails_project')
      }
    ];

    this.terminalLines = [];
    this.state = {
      containerState: null,
      terminalLines: []
    };

    this.toState = this.toState.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.containerState === 'backend') {
      if (!this.terminalSub) {
        this.terminalSub = of(...this.terminalOutput).pipe(
          delay(600),
          concatMap(line => {
            if (line.output) {
              return of({newLine: line.output});
            } else {
              let chars = [];
              if (line.command) {
                chars = [...line.command];
              }
              return concat(
                of({newLine: line.prefix}),
                of(...chars).pipe(
                  delay(Math.random() * 250 + 200),
                  concatMap(char => of(char).pipe(
                    delay(Math.random() * 75 + 25)
                  ))
                )
              )

            }
          }),
          scan((acc, val) => {
            if (val.newLine) {
              return [...acc, val.newLine];
            } else {
              return [
                ...acc.slice(0, acc.length - 1),
                acc[acc.length - 1] + val
              ];
            }
          }, [])
        ).subscribe(terminalLines => {
          this.setState({
            terminalLines
          });
        });
      }
    } else {
      if (this.terminalSub) {
        this.terminalSub.unsubscribe();
        this.terminalSub = null;

        this.setState({
          terminalLines: []
        });
      }
    }
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
          <div className='terminal-text'>
            {this.state.terminalLines.map((line, lineIndex) => (
              <p key={`terminal-line-${lineIndex}`}>{line}</p>
            ))}
          </div>
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
        <img className='tutorial' src={handCursor}/>

      </div>
    )
  }
}

export default App;
