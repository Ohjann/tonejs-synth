import React, { Component } from 'react';
import Tone from 'tone';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.synth = new Tone.Synth({
      oscillator: {
        type: "sine"
      },
      volume: -10
    }).toMaster();
  }

  // equal temperament 
  calculateNote(semiTone) {
    const note = (49 + semiTone) - 24;
    return 440 * Math.pow(Math.pow(2, 1/12), (note - 49));
  }

  getRandomColour() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  changeBackgroundColor()
  {
    document.body.style.background = this.getRandomColour();
  }

  handleClick(event, semiTone) {
    const note = this.calculateNote(semiTone);
    this.changeBackgroundColor();
    this.synth.triggerAttackRelease(note, "8n");
  }

  render() {
    let keys = [];
    const blackwhite = [0,1,0,1,0,0,1,0,1,0,1,0];
    for (let i = 0 ; i < 25; i += 1) {
      let color = "key white";
      if (blackwhite[i%blackwhite.length] === 1) {
        color = "key black";
      }
      keys.push(<div key={i} className={color} onClick={e => this.handleClick(e, i)}></div>);
    }
    return (
      <div className="App">
        <div className="synth">
          <span>Tone.js</span>
          <div className="keys">
            { keys }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
