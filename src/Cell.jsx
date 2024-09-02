export default function Cell(props){
    const styles={
        backgroundColor: props.value!=="" ? "#59E391" : "white"
    }
    return (
        <div className="cell-face" onClick={props.turnEvent} style={styles}>
            <h1 className="cell-val">{props.value}</h1>
        </div>
    )
}