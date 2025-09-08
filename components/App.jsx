import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Timer from "./Timer"

export default function App()
{

    function generateAllNewDice()
    {
        const list=[];

        for(let i = 0; i<10; ++i)
            {
                list.push(
                    {   value:Math.ceil(Math.random() *6),
                        isHeld:false,
                        id:nanoid()
                    }
                );
                
            }
            return list;
    }

    const [dice,setDice] = React.useState(() => generateAllNewDice())

    const diceList=dice.map(dieObj => <Die 
        key={dieObj.id} 
        value={dieObj.value} 
        isHeld={dieObj.isHeld} 
        hold={()=> hold(dieObj.id)} 

        />);

    const [count,setCount] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);


    React.useEffect(()=>{

        const interval = setInterval(() => {
        setSeconds(prevSeconds => 
            {
                if(prevSeconds+1 === 60)
                    {
                        setMinutes(prevMinutes => prevMinutes +1)
                        return 0
                    }
                    return prevSeconds+1
            });
        }, 1000);

        return () => clearInterval(interval);

    },[])

    function rollDice()
    {
        setDice(prevDice => prevDice.map(
            die => (
                die.isHeld === true? die :
                {
                ...die,
                value: Math.ceil(Math.random() *6)
                }
            )
        ))
        setCount(prevCount => prevCount + 1);
    }

    function hold(id)
    {
        setDice(prevDice => prevDice.map(
            die=> (
                die.id ===id? 
                {...die,
                isHeld:  !die.isHeld}
                : die
            )
        ))
    }

    function newGame() 
    {
    setDice(generateAllNewDice())
    setCount(0);
    }

    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);

    const focusNewGameBtn = React.useRef(null);

    React.useEffect(() => {
            if(gameWon)
                {
                    focusNewGameBtn.current.focus()
                }
        }, [gameWon])

    

    return(
        <main >

            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

            <div className="dice_container">
                {diceList}
            </div>

             <button ref={focusNewGameBtn} className="roll_dice_button" onClick={ gameWon ? newGame : rollDice }>{gameWon? "New Game" : "Roll"}</button>  

            <div className="miscellaneous_container">
                <Timer seconds= {seconds} minutes={minutes}/>
                <div>Counter: {count}</div>

            </div>

            {gameWon && <Confetti/>}

            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>

        </main>
    )

}