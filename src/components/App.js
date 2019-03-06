import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import "../styles/App.scss";

class App extends Component {
  componentDidMount() {
    this.setup();
  }
  setup() {
    let xMax = 22;
    let yMax = 22;
    let grid = document.getElementById("grid");
    let controlBtns = document.getElementsByClassName("control-btns");

    let nextGrid = Array(xMax)
      .fill(0)
      .map(() => Array(yMax).fill(0));
    let condition = true;
    let toggle = true;
    let automation;
    controlBtns[0].addEventListener("click", function() {
      console.log("preset");
    });
    controlBtns[1].addEventListener("click", function() {
      console.log("evolve");
      buildNextGrid();
      updateGrid();
    });
    controlBtns[2].addEventListener("click", function() {
      if (condition) {
        automation = window.setInterval(function() {
          toggleBackgroundColor(controlBtns[2]);
          buildNextGrid();
          updateGrid();
        }, 500);
        condition = false;
      } else {
        this.style.color = "black";
        clearInterval(automation);
        condition = true;
      }
    });
    controlBtns[3].addEventListener("click", function() {
      clearInterval(automation);
      condition = true;
      for (var rowIndex = 0; rowIndex < xMax; rowIndex++) {
        for (var cellIndex = 0; cellIndex < yMax; cellIndex++) {
          grid.rows[rowIndex].cells[cellIndex].style.backgroundColor = "white";
          nextGrid[rowIndex][cellIndex] = 0;
        }
      }
    });
    function toggleBackgroundColor(elem) {
      if (toggle) {
        elem.style.color = "blue";
        toggle = false;
      } else {
        elem.style.color = "black";
        toggle = true;
      }
    }
    function addTdListeners(xMax, yMax) {
      for (var rowIndex = 0; rowIndex < xMax; rowIndex++) {
        for (var cellIndex = 0; cellIndex < yMax; cellIndex++) {
          grid.rows[rowIndex].cells[cellIndex].addEventListener(
            "click",
            function() {
              toggleMouse(this);
            }
          );
        }
      }
    }
    function toggleMouse(elem) {
      if (elem.style.backgroundColor == "black") {
        elem.style.backgroundColor = "white";
      } else {
        elem.style.backgroundColor = "black";
      }
    }
    function countNeighbors(grid, y, x) {
      let sum = 0;
      for (var rowIndex = -1; rowIndex < 2; rowIndex++) {
        for (var cellIndex = -1; cellIndex < 2; cellIndex++) {
          if (
            grid.rows[rowIndex + y].cells[cellIndex + x].style
              .backgroundColor == "black"
          ) {
            sum++;
          }
        }
      }
      if (grid.rows[y].cells[x].style.backgroundColor == "black") {
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
            grid.rows[rowIndex].cells[cellIndex].style.backgroundColor ==
            "black"
          ) {
            if (neighbors <= 1 || neighbors >= 4) {
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
            grid.rows[rowIndex].cells[cellIndex].style.backgroundColor =
              "black";
          } else {
            grid.rows[rowIndex].cells[cellIndex].style.backgroundColor =
              "white";
          }
        }
      }
    }
    addTdListeners(yMax, xMax);
  }
  render() {
    return (
      <>
        <section className="control-pannel left">
          <div className="content">
            <h1>Conway's Game of Life (Remix)</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <button className="control-btns">Preset</button>
            <button className="control-btns">Evolve</button>
            <button className="control-btns">(Auto)</button>
            <button className="control-btns">kill</button>
          </div>
        </section>
        <section className="grid-pannel right">
          <div className="content">
            <table id="grid">
              <tbody>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }
}

export default App;
