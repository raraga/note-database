import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component {
  constructor(props) {
    super(props);
    this.message = "This is the Note component"
  }
  render(props) {
    return (
      <div>
        <h2>{this.message}</h2>
      </div>
    )
  }
}

Note.propTypes = {
}

export default Note;
