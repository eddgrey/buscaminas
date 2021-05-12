import win from "./win.png"
import lose from "./lose-face.png"
import playing from "./playing-face.png"
import { useState, useEffect } from "react"

const Marcador = ({newGame, state}) => {
    const src = state === "win"? win : state === "lose"? lose : playing
    const [count, setCount] = useState(0)
    
    const handleNewGame = () => {
        newGame()
        setCount(0)
    }

    useEffect(() => {
        let countIntervalId = null

        if (state === "playing"){
            countIntervalId = setInterval(() => setCount(c => c+1), 1000)
        }
        if (state === "win" || state === "lose") {
            clearInterval(countIntervalId)
        }
        return () => {
            clearInterval(countIntervalId)
        }

    },[state])

    return (
        <section className="px-2 py-1 w-72 flex flex-col items-center">
            <div className=" bg-blue-800 flex flex-row justify-around items-center p-2 rounded-lg w-full">
                <span className="text-2xl text-white">8 💣</span>
                <img src={src} alt={state} className=" w-16"/>
                <span className="text-2xl text-white">{count}</span>
            </div>
            <button onClick={() => handleNewGame()} className="text-white py-1 px-2 bg-blue-800 rounded-lg focus:outline-none mt-4">New Game</button>
        </section>
    )
}

export default Marcador
