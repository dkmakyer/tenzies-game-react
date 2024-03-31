import React from "react";

function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "pink" : "white"
    }
    

    return (
        <div className="die" style={styles} onClick={props.holdDice}>
            <h2 className="die-number">{props.value}</h2>
        </div>
    )
}
export default Die;