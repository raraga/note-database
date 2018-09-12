import React, { Component } from 'react';
import Note from './Note/Note';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>note-database application</h1>
        <Note />
      </div>
    );
  }
}

export default App;
