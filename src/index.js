import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Board from './Board';
import registerServiceWorker from './registerServiceWorker';

const Game = () => (
    <div className="game">
        <div className="game-board">
            <Board />
        </div>
    </div>
);

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
