import React, { Component } from 'react';
import Note from './Note/Note';
import Noteform from './Noteform/Noteform';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
   
    this.state = {
      notes: [
        { id: 1, noteContent: 'Note 1 here!'},
        { id: 2, noteContent: 'Note 2 here!'},
      ],
    };
  }
  addNote(note) {
    // push the note onto the notes array.
    const previousNotes =  this.state.notes;
    // Mock object to show functionality, will be replaced with Firebase.
    previousNotes.push({ id: previousNotes.length + 1, noteContent: note }); 
    this.setState({
      notes: previousNotes
    });
  }
  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>

        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id } />
              );
            })
          }
        </div>
        <div className="notesFooter">
          <Noteform addNote={this.addNote} /> 
    
        </div>
      </div>
    );
  }
}

export default App;
