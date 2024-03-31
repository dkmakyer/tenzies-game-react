import React from "react";
import Component from "./component";
import Die from "./die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

function App(){
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if(allHeld && allSameValue){
            setTenzies(true)
            
        } 
        
    },[dice])

    const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)} />)
    
    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }
    function generateDie(){
        return {value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }
    }

    function allNewDice(){
        const newDice = []
        for(let i = 0; i < 10; i++){
            newDice.push(generateDie())
        //we pushed an object data type into the empty newDice array instead of a number data type
        }
        return newDice
    }

    

    function rollDice(){
        if(!tenzies){
            setDice(prevDice => prevDice.map(die =>{
                return die.isHeld ? die : generateDie()
            }))
        }else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
        
    
    return (
        <main>
            {tenzies && <ReactConfetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {diceElements}
            </div>
            <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}
export default App;