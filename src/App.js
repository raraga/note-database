import React, { Component } from 'react';
import Note from './Note/Note';
import Noteform from './Noteform/Noteform';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
   
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database  = this.app.database().ref().child('notes');

    this.state = {
      notes: [],
    };
  }

componentWillMount() {
  const previousNotes = this.state.notes;
  // Data Snapshot
  this.database.on('child_added', snap => {
    previousNotes.push({
      id: snap.key,
      noteContent: snap.val().noteContent,
    })

  this.setState ({
      notes: previousNotes
    })
  })

// When 'child_removed event occurs, we get a data snapshot in return with snap.
// Loop through our previousNotes array and for any instance in the array that id = key within the snapshot,
// splice that out of our previousNotes array, delete 1 item.

  this.database.on('child_removed', snap => {
    for(var i=0; i < previousNotes.length; i++) {
      if(previousNotes[i].id === snap.key) {
        previousNotes.splice(i,1);
      }
    }
  this.setState ({
      notes: previousNotes
    })
  })
}
  addNote(note) {
    this.database.push().set({ noteContent: note });
  }
  removeNote(noteId) {
    this.database.child(noteId).remove();
  }
  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React & Firebase</div>
        </div>

        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote={this.removeNote}/>
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
