import React, { Component } from 'react';
import './App.css';
import './Table.css';
import Modal from './Modal.js';

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {line: props.line,
        header: props.header,
        data: props.data,
        isOpen: false};
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
    }

    isFullDay(index) {
        var isFull = true;
        var d = this.state.data;
        for (var i = 0; i < d.length; i++) {
            isFull = isFull && (d[i][index]);
        }
        return isFull;
    }

    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

  render() {
    return (
    <div>
      <table className="App">
        <tr>{this.state.header.map((item, index) => {
                return (<th key={index}>{item}</th>);
            }
        )}</tr>
        {this.state.data.map((row, idx) => {
            return (
                <tr key={idx}>{row.map((cellValue, i) => {
                    var id = 'r' + idx + 'c' + i;
                    if (i === 0) {
                        return (<td key={i} id={id}>{cellValue}</td>);
                    } else {
                        var nums = this.state.header[i].split('.');
                        var date = new Date(nums[2], nums[1] - 1, nums[0]);
                        var old = new Date() > date;
                        var isFull = this.isFullDay(i);
                        var color = "";
                        if (old) {
                            if (isFull) {
                                color = "#8FBC8F";
                            } else {
                                color = "#d9d8e3";
                            }
                        } else if (isFull) {
                            color = "#4CAF50";
                        }
                        var style = isFull || old ? {backgroundColor: color} : {};
                        return(<td key={i} id={id} style={style}><input type="checkbox" checked={cellValue}
                            onChange={e => this.changeCheckbox(e, idx, i)} disabled={old}/></td>);
                    }
                    }
                )}</tr>
            );
            }
        )}
            <tr><td><input type="button" value="Add Player"
                onClick={this.toggleModal}/></td>
            <td colSpan={this.state.data[0].length - 1} style={{border:"white"}}></td></tr>
      </table>
      <Modal show={this.state.isOpen} callback={}
                onClose={this.toggleModal}>
                <p>New player</p>
                <input type="text" size="40"></input>
              </Modal>
      </div>
    );
  }

    changeCheckbox(event, idx, i) {
        var d = this.state.data;
        d[idx][i] = event.target.checked;
        this.setState({data: d});
        this.render();
    }

    addPlayer() {
//        var name =
        var d = this.state.data;
        var newRow = [];
        newRow.push(name);
        for (var i = 1; i < d[0].length; ++i) {
            newRow.push(false);
        }
        d.push(newRow);
        this.setState({data: d});
        this.render();
    }
}

export default Table;