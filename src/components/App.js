import React, { Component } from 'react';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>Hello Tabular app!</h4>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
