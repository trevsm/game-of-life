import React, { Component } from "react";
import "../styles/App.scss";

class App extends Component {
  componentDidMount() {
    this.setup();
    this.state = { size: 20 };
  }
  setup() {
    const color = "black";
    const inverse = "white";
    let grid = document.getElementById("grid");
    var rows;
    var cell;
    let nextGrid = Array(this.state.size)
      .fill(0)
      .map(function() {
        return Array(this.state.size).fill(0);
      });
    let interval;

    function countNeighbors(grid, y, x) {
      let sum = 0;
      for (var rowIndex = -1; rowIndex <= 1; rowIndex++) {
        for (var cellIndex = -1; cellIndex <= 1; cellIndex++) {
          if (
            grid.rows[y + rowIndex].cells[x + cellIndex].style
              .backgroundColor == color
          ) {
            sum++;
          }
        }
      }
      if (grid.rows[y].cells[x].style.backgroundColor == color) {
        sum--;
      }
      return sum;
    }
    function buildNextGrid() {
      let neighbors = 0;
      for (var rowIndex = 1; rowIndex < this.state.size; rowIndex++) {
        for (var cellIndex = 1; cellIndex < this.state.size; cellIndex++) {
          neighbors = countNeighbors(grid, rowIndex, cellIndex);
          if (
            grid.rows[rowIndex].cells[cellIndex].style.backgroundColor == color
          ) {
            if (neighbors < 2 || neighbors >= 4) {
              nextGrid[rowIndex][cellIndex] = 0;
            }
            if (neighbors == 2 || neighbors == 3) {
              nextGrid[rowIndex][cellIndex] = 1;
            }
          } else {
            if (neighbors == 3) {
              nextGrid[rowIndex][cellIndex] = 1;
            }
          }
        }
      }
    }
    function updateGrid() {
      for (var rowIndex = 1; rowIndex < this.state.size; rowIndex++) {
        for (var cellIndex = 1; cellIndex < this.state.size; cellIndex++) {
          if (nextGrid[rowIndex][cellIndex] == 1) {
            grid.rows[rowIndex].cells[cellIndex].style.backgroundColor = color;
          } else {
            grid.rows[rowIndex].cells[
              cellIndex
            ].style.backgroundColor = inverse;
          }
        }
      }
    }
    function createTable() {
      rows = [];
      for (var rowIndex = 0; rowIndex < this.state.size; rowIndex++) {
        cell = [];
        for (var cellIndex = 0; cellIndex < this.state.size; cellIndex++) {
          cell.push(<td />);
        }
        rows.push(<tr>{cell}</tr>);
      }
    }
    function run() {
      createTable();
      //preset live squares
      for (var i = 6; i < 16; i++) {
        grid.rows[5].cells[i].style.backgroundColor = color;
      }
      grid.rows[2].cells[1].style.backgroundColor = color;
      grid.rows[2].cells[2].style.backgroundColor = color;
      grid.rows[2].cells[3].style.backgroundColor = color;
      //set automated life-cycle
      interval = window.setInterval(function() {
        buildNextGrid();
        updateGrid();
      }, 500);
    }
    run(); // create table, darken cells, start interval
  }
  render() {
    return (
      <table id="grid">
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default App;
