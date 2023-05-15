import { useEffect, useState } from "react";
import Tile from "./Tile";
import styles from "./Board.module.css"

export default function Board(props) {
    const [clickedTile, setClickedTile] = useState(null);
    const [tiles, setTiles] = useState(props.tiles);
    const [moves, setMoves] = useState(0);
    const [win, setWin] = useState(false);

    useEffect(() => {
        // Controllo se il tile può muoversi, scateno lo use effect ogni volta che cambia l'elemento cliccato,
        // per gli spostamenti a destra e sinistra controllo tramite l'utilizzo del modulo la posizione
        let array = [...tiles]; // Necessario fare una copia dell'array per cambiare il riferimento in modo
        // che React colga il cambiamento, scambiando solo di posizione gli elementi dell'array React
        // non cambierebbe la vista

        if (
            array[clickedTile?.position + 1] === null && // controllo se l'elemento a dx di quello cliccato è vuoto
            clickedTile?.position % 4 !== 3 // controllo che l'elemento cliccato non sia sull'ultima riga
        ) {
            array[clickedTile?.position + 1] = clickedTile?.value;
            array[clickedTile.position] = null;
        } else if (
            tiles[clickedTile?.position - 1] === null && // controllo se l'elemento a sx di quello cliccato è vuoto
            clickedTile?.position % 4 !== 0 // controllo che l'elemento cliccato non sia sulla prima riga
        ) {
            array[clickedTile?.position - 1] = clickedTile?.value;
            array[clickedTile.position] = null;
        } else if (tiles[clickedTile?.position + 4] === null) {
            // controllo se l'elemento sotto quello cliccato è quello vuoto
            array[clickedTile?.position + 4] = clickedTile?.value;
            array[clickedTile.position] = null;
        } else if (tiles[clickedTile?.position - 4] === null) {
            // controllo se l'elemento sopra quello cliccato è quello vuoto
            array[clickedTile?.position - 4] = clickedTile?.value;
            array[clickedTile.position] = null;
        }
        setTiles(array);
        if (clickedTile !== null) {
            let m = moves;
            m = m + 1;
            setMoves(m);
        }
    }, [clickedTile]); // dependecy su clikedTile, lo useEffect parte al primo render e a ogni cambiamento di clickedTile

    useEffect(() => { // useEffect utilizzato per vedere il giocatore ha vinto o no
        let array = [...tiles];
        if (array[array.length - 1] === null) {
            array.pop(); // tolgo l'ultimo elemento nel caso sia null
            setWin(isSorted(array));
        } else {
            setWin(false)
        }
    }, [tiles]); // dependecy su tiles, lo useEffect parte al primo render e ad ogni cambiamento di tiles

    function isSorted(arr) { // Funzione per vedere se l'array è ordinato, restituisce true se l'array è ordinato, false altrimenti
        return arr.every(function (x, i) {
            return i === 0 || x >= arr[i - 1]; // false se il precedente è più grande
        });
    }

    return (
        <>
            <h2>{win === true ? "You win" : ""}</h2>
            <div className={styles.border}>
                <div className={styles.table}>
                    {tiles.map((value, index) => (
                        <Tile
                            value={value}
                            position={index}
                            key={index}
                            clicked={() => setClickedTile({ position: index, value: value })}
                        ></Tile>
                    ))}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "1em",
                }}
            >
                <button onClick={() => window.location.reload()}>New Game</button>
                <p style={{ margin: "0", marginLeft: "1em" }}>Moves: {moves}</p>
            </div>
        </>
    );
}