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
    let xMax = 20;
    let yMax = 20;
    let grid = document.getElementById("grid");

    let nextGrid = Array(xMax)
      .fill(0)
      .map(function() {
        return Array(yMax).fill(0);
      });

    let condition = true;
    let toggle = true;
    let automation;

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
      for (var rowIndex = 1; rowIndex < xMax - 1; rowIndex++) {
        for (var cellIndex = 1; cellIndex < yMax - 1; cellIndex++) {
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
      for (var rowIndex = 1; rowIndex < xMax - 1; rowIndex++) {
        for (var cellIndex = 1; cellIndex < yMax - 1; cellIndex++) {
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
      let rows = [];
      for (var rowIndex = 0; rowIndex < this.state.size; rowIndex++) {
        let cell = [];
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
      automation = window.setInterval(function() {
        buildNextGrid();
        updateGrid();
      }, 500);
    }
    run(); // create table, darken cells, start automation
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
