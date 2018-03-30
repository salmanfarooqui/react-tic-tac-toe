import FontAwesome from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/fontawesome-free-solid';
import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { square: Array(9).fill(null), isX: true };
    this.resethandler = this.resethandler.bind(this);
  }
  clickhandler(i) {
    const newsquare = this.state.square.slice(); // just copying to avoid mutation
    if (calculatewinner(newsquare) || newsquare[i]) { // calculatewinner(newsquare) return if somwone has won. so no more clicks //newsquare[i] to stop multiple click on the already filled box. if clicked box is filled, newsquare[i] will be true and the function be simply return.
      return;
    }
    newsquare[i] = this.state.isX ? 'X' : 'O';
    this.setState({ square: newsquare, isX: !this.state.isX }); // after click isX value toggles
  }
  resethandler() {
    const resetit = this.state.square.map(() => null);
    this.setState({ square: resetit, isX: true });
  }
  rendersquare(i) {
    const win = calculatewinner(this.state.square);
    let chance;
    if (win) { // winner will be true, if there is no null i.e winning comination found
      if (i === win[1] || i === win[2] || i === win[3]) {
        chance = 'won';
      }
    }
    return <Square myid={chance} value={this.state.square[i]} clickme={() => this.clickhandler(i)} />; // clickme={this.clickhandler(i)} will execute the value instead of referancing it.
  }

  render() {
    const winner = calculatewinner(this.state.square); // will equate to either X or O or null
    let status;
    if (winner) { // winner will be true if there is no null i.e winning comination found
      status = `Winner is ${winner[0]}`; // Instead of - 'Winner is ' + winner[0]  because of eslint
    } else {
      const draw = this.state.square.some(el => el === null);
      if (!draw) {
        status = 'Game Draw';
      } else {
        status = `Next Player is ${this.state.isX ? 'X' : 'O'}`;
      }
    }
    return (
      <div>
        <div className="gameinfo">
          <div className="status">{status}</div>
          <span className="reset" role="button" title="reset" onClick={this.resethandler}><FontAwesome icon={faRedo} /></span>
          <div className="clear" />
        </div>
        <div className="board-row">
          {this.rendersquare(0)} { /* renders <Square value=..../>  this way is DRY. You don't have to repeat <square../> every time */}
          {this.rendersquare(1)}
          {this.rendersquare(2)}
        </div>
        <div className="board-row">
          {this.rendersquare(3)}
          {this.rendersquare(4)}
          {this.rendersquare(5)}
        </div>
        <div className="board-row">
          {this.rendersquare(6)}
          {this.rendersquare(7)}
          {this.rendersquare(8)}
        </div>
      </div>
    );
  }
}

function calculatewinner(mystate) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) { // looping through all winning combinations, using i +=1 instead of i++ for eslint(no issue with i++)
    const [a, b, c] = lines[i]; // assigning 0 to a, 1 to b and 2 to c for first loop. For fifth loop, a=1, b=4,c=7
    if (mystate[a] && mystate[b] === mystate[c] && mystate[c] === mystate[a]) { // comparing if winning combinations have all the three same boxes (either all X or all O)
      return (
        [mystate[a]].concat(lines[i])
      ); // you can return anyone mystate[a], mystate[b] or [c] because they all will be the same. either X or O
    }
  }
  return null; // if all the winning loops happen and there is no winner, then we return null. We can use it for continuing the play.
}

export default Board;
