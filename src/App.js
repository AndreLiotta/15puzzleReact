import Board from "./Board.js";
import { useEffect } from "react";

function App() {
  const game = [];

  useEffect(() => {
    init()
  })
  
  function init() {
    let temp;
    const maxValue = 15;
    // costruisco un array di valori Random
    let arrayBool = [];
    for (let i = 0; i < maxValue; i++) arrayBool.push(false);
    for (let i = 0; i < maxValue; i++) {
      temp = Math.trunc(Math.random() * maxValue + 1);
      while (arrayBool[temp])
        temp = Math.trunc(Math.random() * maxValue + 1);
      arrayBool[temp] = true;
      game[i] = temp;
    }
    // invoco la funzione init() finché non ottengo una sequenza utile
    console.log(game);
    if (isSolvable(game)) {
      game.push(null); // aggiungo il 16esimo valore null
      return
    } else init();
  }

  // verifico che la sequenza sia risolvibile
  function isSolvable(game) {
    let inversionCount = 0;
    for (let i = 0; i < game.length - 1; i++) {
      for (let j = i + 1; j < game.length; j++) {
        if (game[i] > game[j]) inversionCount++;
      }
    }
    if (inversionCount % 2 === 0) return true; else return false;
  }

  return (
    <div style={{ marginLeft: "0.5em" }}>
      <h1 style={{ fontFamily: "Serif", fontSize: "24px" }}>15 puzzle game</h1>
      Click tiles to order
      <Board tiles={game} />
    </div>
  );
}

export default App;
