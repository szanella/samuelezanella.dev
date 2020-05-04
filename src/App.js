import React from 'react';
import './App.scss';
import ExtLink from './components/ExtLink';
import handCursor from './assets/svg/hand-cursor.svg';
import {concatMap, delay, scan} from 'rxjs/operators';
import {of, concat} from 'rxjs';
import Caption from './components/Caption';
import Card from './components/card/Card';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.containerStates = [
      'intro',
      'frontend',
      'backend',
      'pm',
      'ai',
      'contacts'
    ];

    this.nShards = 13;

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
        command: 'rick = User.create(name: "Rick Sanchez")'
      },
      {
        output: '=> #<User id: 1, name: "Rick Sanchez">'
      },
      {
        prefix: '2.6.3 :002 > ',
        command: 'rick.greet'
      },
      {
        output: '=> "Wubba Lubba dub-dub!"'
      },
      {
        prefix: '2.6.3 :003 > ',
        command: 'exit'
      },
      {
        prefix: this.terminalPrefix('my_rails_project')
      }
    ];

    this.terminalLines = [];
    this.state = {
      containerState: null,
      terminalLines: [],
      tutorialHidden: false,
      captionExpanded: false
    };

    this.toState = this.toState.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.toggleCaptionExpanded = this.toggleCaptionExpanded.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.containerState === 'backend' && !this.state.captionExpanded) {
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
                  delay(Math.random() * 300 + 200),
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
    } else if (event.key === ' ') {
      this.toggleCaptionExpanded();
    }
  }

  toState(next = true) {
    if (this.state.captionExpanded) {
      return;
    }
    const currentIndex = this.containerStates.indexOf(this.state.containerState);
    const totStates = this.containerStates.length;

    // Rotate the state index between 0 and the number of states - 1
    this.setState({
      containerState: this.containerStates[next ?
        (currentIndex + 1) % totStates :
        (currentIndex + totStates - 1) % totStates],
      tutorialHidden: true,
      captionExpanded: false
    });
  }

  toggleCaptionExpanded(event = null) {
    if (!['frontend', 'backend', 'pm', 'ai'].includes(this.state.containerState)) {
      return;
    }

    if (event) {
      event.stopPropagation();
    }
    
    const {captionExpanded} = this.state;

    this.setState({
      captionExpanded: !captionExpanded
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
    const {containerState, terminalLines, tutorialHidden, captionExpanded} = this.state;

    return (
      <div className={`app ${containerState} ${captionExpanded ? 'caption-expanded' : ''}`}
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
            {terminalLines.map((line, lineIndex) => (
              <p key={`terminal-line-${lineIndex}`}>{line}</p>
            ))}
          </div>
          <div className='frontend-contents'>
            <div className='profile-name'></div>
            <div className='profile-sub'></div>
            <div className='post__user post--1__user'></div>
            <div className='post__line post--1__line--1'></div>
            <div className='post__line post--1__line--2'></div>
            <div className='post__line post--1__line--3'></div>
            <div className='post__user post--2__user'></div>
            <div className='post__line post--2__line--1'></div>
            <div className='post__line post--2__line--2'></div>
            <div className='post__line post--2__line--3'></div>
            <div className='post__line post--2__line--4'></div>
          </div>
          <div className='trello-columns'>
            <div className='column column--1'>
              <div className='column__title column__title--2'></div>
              <Card nRows={3} lastRowLength={1}></Card>
              <Card nRows={2} lastRowLength={2}></Card>
              <Card nRows={1} lastRowLength={2}></Card>
              <Card nRows={2} lastRowLength={3}></Card>
            </div>
            <div className='column column--2'>
              <div className='column__title column__title--1'></div>
              <Card nRows={2} lastRowLength={2}></Card>
              <Card nRows={2} lastRowLength={1}></Card>
              <Card nRows={1} lastRowLength={1}></Card>
            </div>
            <div className='column column--3'>
              <div className='column__title column__title--3'></div>
              <Card nRows={3} lastRowLength={1}></Card>
              <Card nRows={3} lastRowLength={2}></Card>
              <Card nRows={2} lastRowLength={1}></Card>
              <Card nRows={1} lastRowLength={3}></Card>
            </div>
            <div className='column column--4'>
              <div className='column__title column__title--2'></div>
              <Card nRows={2} lastRowLength={1}></Card>
              <Card nRows={1} lastRowLength={2}></Card>
              <Card nRows={1} lastRowLength={2}></Card>
              <Card nRows={2} lastRowLength={3}></Card>
              <Card nRows={3} lastRowLength={1}></Card>
              <Card nRows={3} lastRowLength={2}></Card>
            </div>
          </div>
        </div>

        <Caption shown={containerState === 'frontend'}
                 expanded={captionExpanded}
                 predicate='do'
                 subject='Frontend'
                 onClick={this.toggleCaptionExpanded}>
          <p>I love creating sleek and usable interfaces using bleeding edge technologies.</p>
          <p>My main focus are web applications, built in <span className='accent'>Angular</span> and <span className='accent'>React</span>, in conjunction with <span className='accent'>Redux</span>.</p>
          <p>I am proficient with <span className='accent'>HTML5</span> and  <span className='accent'>CSS</span>, which I often use paired with  <span className='accent'>Sass</span>.</p>
        </Caption>
        <Caption shown={containerState === 'backend'}
                 expanded={captionExpanded}
                 predicate='do'
                 subject='Backend'
                 onClick={this.toggleCaptionExpanded}>
          <p>I build <span className='accent'>REST</span> and <span className='accent'>GraphQL</span> backends, mainly in <span className='accent'>Ruby on Rails</span> and with relational databases.</p>
          <p>I am also familiar with <span className='accent'>Node.js</span> and non-relational databases such as <span className='accent'>MongoDB</span>.</p>
        </Caption>
        <Caption shown={containerState === 'pm'}
                 expanded={captionExpanded}
                 predicate='do'
                 subject='Project Management'
                 onClick={this.toggleCaptionExpanded}>
          <p>I have always been fascinated by Artificial Intelligence.</p>
          <p>I have taken Udemy courses and tinkered with <span className='accent'>Keras</span> and <span className='accent'>Tensorflow</span>, experimenting with simple <span className='accent'>ANNs</span> and <span className='accent'>CNNs</span>.</p>
          <p>I am also interested in the topic of <span className='accent'>AI safety</span>, and follow several sources that talk about it.</p>
        </Caption>
        <Caption shown={containerState === 'ai'}
                 expanded={captionExpanded}
                 predicate='love'
                 subject='Artificial Intelligence'
                 onClick={this.toggleCaptionExpanded}>
          <p>I have always been fascinated by Artificial Intelligence.</p>
          <p>I have taken Udemy courses and tinkered with <span className='accent'>Keras</span> and <span className='accent'>Tensorflow</span>, experimenting with simple <span className='accent'>ANNs</span> and <span className='accent'>CNNs</span>.</p>
          <p>I am also interested in the topic of <span className='accent'>AI safety</span>, and follow several sources that talk about it.</p>
        </Caption>
        <div className={`caption-overlay ${captionExpanded ? 'active' : ''}`}
             onClick={this.toggleCaptionExpanded}></div>

        <div className='contacts'>
          <p>Find me here:</p>
          <p><ExtLink href='https://www.linkedin.com/in/samuele-zanella/'>LinkedIn</ExtLink></p>
          <p><ExtLink href='https://github.com/szanella'>GitHub</ExtLink></p>
          <p><ExtLink href='mailto:hello@samuelezanella.dev'>hello@samuelezanella.dev</ExtLink></p>
        </div>
        <img alt='tutorial' className={`tutorial ${tutorialHidden ? 'hidden' : ''}`} src={handCursor}/>
      </div>
    )
  }
}

export default App;
