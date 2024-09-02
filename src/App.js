import React from "react";
import Cell from "./Cell.jsx";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [boxes, setBoxes] = useState(boxCreator());
  const [turn, setTurn] = useState(0);
  const [won, setWon] = useState(false);

  function checkWin() {
    const player = !(turn & 1) ? "X" : "O";
    // console.log(boxes, player);
    let isWin = true;
    for (let i = 0; i < 9; i += 3) {
      isWin = true;
      for (let j = i; j < Math.min(i + 3, 9); j++) {
        isWin = isWin && boxes[j].value === player;
        if (!isWin) {
          break;
        }
      }

      if (isWin) {
        return true;
      }
    }
    for (let i = 0; i < 3; i += 1) {
      isWin = true;
      for (let j = 0; j < 3; j++) {
        isWin = isWin && boxes[j * 3 + i].value === player;
        if (!isWin) {
          break;
        }
      }
      if (isWin) {
        return true;
      }
    }
    isWin = true;
    for (let i = 0; i < 3; i++) {
      isWin = isWin && boxes[i * 3 + i].value === player;
    }
    if (isWin) return true;

    isWin = true;
    for (let i = 0; i < 3; i++) {
      isWin = isWin && boxes[(i + 1) * 3 - i - 1].value === player;
    }
    return isWin;
  }

  useEffect(() => {
    if (checkWin()) {
      setWon(true);
    }
  }, [turn]);

  function boxCreator() {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      arr.push({ id: nanoid(), value: "" });
    }
    return arr;
  }

  function turnEvent(boxId) {
    // console.log(boxId);
    if (!won) {
      setBoxes((prevState) =>
        prevState.map((box) =>
          box.id === boxId
            ? !(turn & 1)
              ? { ...box, value: "O" }
              : { ...box, value: "X" }
            : box
        )
      );
      setTurn((prevState) => 1 + prevState);
    }
  }

  const boxElement = boxes.map((cell) => {
    return (
      <Cell
        key={cell.id}
        id={cell.id}
        value={cell.value}
        turnEvent={() => turnEvent(cell.id)}
      />
    );
  });

  function newGame() {
    setBoxes(boxCreator());
    setWon(false);
    setTurn(0);
  }

  return (
    <main>
      {won && <Confetti />}
      <h1>Tic Tac Toe</h1>
      <div className="box-container">{boxElement}</div>
      <h2>
        {!(turn & 1)
          ? won
            ? "Player 2 Won!"
            : "Player 1 Turn"
          : won
          ? "Player 1 Won!"
          : "Player 2 Turn"}
      </h2>
      <h2
        onClick={newGame}
        style={{ backgroundColor: "#2bd8a4", cursor: "pointer" }}
      >
        {" "}
        {won ? "Play Again!" : "Restart"}{" "}
      </h2>
    </main>
  );
}
