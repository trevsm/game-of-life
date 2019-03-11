import React, { Component } from "react";
import "../styles/App.scss";


const judge = (game, newGame, size) => {
  let neighbors = 0;

  for (var i = 1; i < size-1; i++) {
    for (var j = 1; j < size-1; j++) {
      neighbors = countNeighbors(game, i, j);
      if (
        game[i][j] == true
      ) {
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
        game[yPos + i][xPos + j] == false ? sum ++ : sum--;
    }
  }
  if (game[yPos][xPos] == true) {
    sum--;
  }
  return sum;
}

class App extends Component {
  constructor(props) {
    super(props);

    const size = 20;
    const game = [];

    // create empty game
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(false);
      }
      game.push(row);
    }

    // inital state for testing
    // for (var i = 0; i < 10; i++) {
    //   game[5][5+i] = true;
    // }

    game[5][5] = true;
    game[5][6] = true;
    game[5][7] = true;

    this.state = {
      game, size
    };

    // use bind to force correct 'this' which has this.state
    this.tick = this.tick.bind(this);
    //this.size = this.size.bind(this);
  }

  componentDidMount() {
    window.setInterval(this.tick, 1000);
  }

  tick() {
    const { game, size} = this.state; // current game state
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
    })
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
                <td className={cell ? 'living' : ''}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default App;
