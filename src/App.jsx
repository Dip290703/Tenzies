import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid/non-secure";
import Confetti from "react-confetti"
export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const gameWon = dice.every(die => die.isHeld) &&
  dice.every(die => die.value === dice[0].value)
  function generateAllNewDice() {
    // const newDice = [];
    // for (let i = 0; i < 10; i++) {
    //   const rand = Math.ceil(Math.random() * 6);
    //   newDice.push(rand);
    // }
    // return newDice;
    return Array(10)
      .fill(0)
      .map(() => ({ value: Math.ceil(Math.random() * 6), isHeld: false,id:nanoid() }));
  }
 

  function rollDice() {
    if(!gameWon)
    {setDice(oldDice => oldDice.map( die => 
      die.isHeld ? 
      die :
      {...die,value:Math.ceil(Math.random() * 6)}
    ))}
    else{
      setDice(generateAllNewDice())
    }
  }
  function hold(id) {
    setDice(oldDice => oldDice.map(die =>
        die.id === id ?
            { ...die, isHeld: !die.isHeld } :
            die
    ))
}
  const diceElements = dice.map((dieObj) => (
    <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} hold={() => hold(dieObj.id)} id={dieObj.id} />
  ));
  return (
    
    <main>
      {gameWon && <Confetti />}
      <div className="sr-only">
           {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
     </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice} className="roll-dice">
        {gameWon ? "New Game" :"Roll"}
      </button>
    </main>
  );
}
