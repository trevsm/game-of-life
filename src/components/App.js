import React, { Component } from "react";
import "../styles/App.scss";

function judge(game, newGame, size) {
  let neighbors = 0;

  for (var i = 1; i < size - 1; i++) {
    for (var j = 1; j < size - 1; j++) {
      neighbors = countNeighbors(game, i, j);
      if (game[i][j] == true) {
        if (neighbors < 2 || neighbors >= 4) {
          newGame[i][j] = false;
        }
        if (neighbors == 2 || neighbors == 3) {
          newGame[i][j] = true;
        }
      } else {
        if (neighbors == 3) {
          newGame[i][j] = true;
        }
      }
    }
  }
}
let countNeighbors = (game, yPos, xPos) => {
  let sum = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (game[yPos + i][xPos + j] == true) {
        sum++;
      }
    }
  }
  if (game[yPos][xPos] == true) {
    sum--;
  }
  return sum;
};

class App extends Component {
  constructor(props) {
    super(props);

    const size = 100;
    const game = [];

    // create empty game
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(!Math.round(Math.random()));
      }
      game.push(row);
    }

    this.state = {
      game,
      size
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    window.setInterval(this.tick, 50);
  }

  tick() {
    const { game, size } = this.state; // current game state
    const newGame = [];

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(false);
      }
      newGame.push(row);
    }

    // look at each cell in current game state and calculate if needs to die or live...
    judge(game, newGame, size);
    // update newGame with next game state

    // game logic...

    this.setState({
      game: newGame
    });
  }

  render() {
    // const game = this.state.game;
    const { game } = this.state;
    return (
      <table>
        <tbody>
          {game.map(row => (
            <tr>
              {row.map(cell => (
                <td className={cell ? "living" : ""} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default App;
