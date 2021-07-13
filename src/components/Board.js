import React, { useState } from "react";
import Tile from "./Tile";
import Cell from "./Cell";
import { Board } from "../helper";
import useEvent from "../hooks/useEvent";
import GameOverlay from "./GameOverlay";

const BoardView = () => {
  const [board, setBoard] = useState(new Board());

  const up = () => {
    if (board.hasWon()) {
      return;
    }
    let direction = 38;
    let boardClone = Object.assign(
      Object.create(Object.getPrototypeOf(board)),
      board
    );
    let neweBoard = boardClone.move(direction);
    setBoard(neweBoard);
  };

  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let neweBoard = boardClone.move(direction);
      setBoard(neweBoard);
    }
  };

  useEvent("keydown", handleKeyDown);

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  const resetGame = () => {
    setBoard(new Board());
  };

  return (
    <div>
      <div className="details-box">
        <div className="resetButton" onClick={resetGame}>
          new game
        </div>
        <div className="score-box">
          <div className="score-header">SCORE</div>
          <div>{board.score}</div>
        </div>
      </div>
      <div className="board">
        {cells}
        {tiles}
        <GameOverlay onRestart={resetGame} board={board} />
      </div>
      <div>
        <button onClick={up}>↑</button>

        <br />

        {/* <button onClick="left()">←</button>

        <button onClick="right()">→</button>

        <br />

        <button onClick="down()">↓</button>

        <br /> */}
        <div className="credits">
          <p style={{ display: "inline" }}>Motion Graphics By: </p>

          <a
            href="https://www.behance.net/romaincousin"
            style={{ color: "white", textTransform: "uppercase" }}
          >
            Romain Cousin
          </a>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
