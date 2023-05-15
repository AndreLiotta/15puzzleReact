import styles from "./Tile.module.css";

export default function Tile2(props) {
    let className = styles.tile;
    if (props.value === null) className = styles.blankTile;

    return (
        <button
            onClick={props.clicked}
            className={className}
        >
            {props.value === null ? "" : props.value}
        </button>
    );
}
