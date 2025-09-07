import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
export default function App()
{
    function generateAllNewDice()
    {
        const list=[];

        for(let i = 0; i<10; ++i)
            {
                list.push(
                    {   value:Math.ceil(Math.random() *6),
                        isHeld:true,
                        id:nanoid()
                    }
                );
                
            }
            return list;
    }

    const [dice,setDice] = React.useState(generateAllNewDice())

    const diceList=dice.map(dieObj => <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld}/>);

    function rollDice()
    {
        setDice(generateAllNewDice())
    }

    return(
        <main >
            <section className="dice_container">
                {diceList}
            </section>

             <button className="roll_dice_button" onClick={rollDice}>Roll</button>   
        </main>
    )

}