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

  for (var i = 6; i < 16; i++) {
    grid.rows[5].cells[i].style.backgroundColor = "black";
  }
  for (var i = 14; i < 16; i++) {
    for (var j = 3; j < 5; j++) {
      grid.rows[i].cells[j].style.backgroundColor = "black";
    }
  }
  for (var i = 16; i < 18; i++) {
    for (var j = 5; j < 7; j++) {
      grid.rows[i].cells[j].style.backgroundColor = "black";
    }
  }
  grid.rows[11].cells[11].style.backgroundColor = "black";
  grid.rows[12].cells[12].style.backgroundColor = "black";
  grid.rows[11].cells[13].style.backgroundColor = "black";
  grid.rows[12].cells[13].style.backgroundColor = "black";
  grid.rows[13].cells[12].style.backgroundColor = "black";
});
controlBtns[1].addEventListener("click", function() {
  console.log("evolve");
  buildNextGrid();
  updateGrid();
});
controlBtns[2].addEventListener("click", function() {
  if (condition) {
    automation = window.setInterval(function() {
      toggleColor(controlBtns[2]);
      buildNextGrid();
      updateGrid();
    }, 500);
    condition = false;
  } else {
    this.style.color = "black";
    clearInterval(automation);
    condition = true;
  }
  console.log(condition);
});
controlBtns[3].addEventListener("click", function() {
  clearInterval(automation);
  controlBtns[2].style.color = "black"; //small bug fix
  condition = true;
  for (var rowIndex = 0; rowIndex < xMax; rowIndex++) {
    for (var cellIndex = 0; cellIndex < yMax; cellIndex++) {
      grid.rows[rowIndex].cells[cellIndex].style.backgroundColor = "white";
      nextGrid[rowIndex][cellIndex] = 0;
    }
  }
});
function toggleColor(elem) {
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
  for (var rowIndex = -1; rowIndex <= 1; rowIndex++) {
    for (var cellIndex = -1; cellIndex <= 1; cellIndex++) {
      if (
        grid.rows[y + rowIndex].cells[x + cellIndex].style.backgroundColor ==
        "black"
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
        grid.rows[rowIndex].cells[cellIndex].style.backgroundColor == "black"
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
        grid.rows[rowIndex].cells[cellIndex].style.backgroundColor = "black";
      } else {
        grid.rows[rowIndex].cells[cellIndex].style.backgroundColor = "white";
      }
    }
  }
}
addTdListeners(yMax, xMax);
