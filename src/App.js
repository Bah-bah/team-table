import React, { Component } from 'react';
import './App.css';
import Table from './Table.js';

class App extends Component {

  render() {
  var header = ['', '10.05.2017', '06.06.2017', '25.06.2017', '07.07.2017'];
  var data = [['Messi', true, true, false, true],
              ['Ronaldo', true, true, false, true],
              ['Neuer', false, true, true, true]];
    return (
      <Table line="Ohoho!" header={header} data={data} />
    );
  }
}

export default App;