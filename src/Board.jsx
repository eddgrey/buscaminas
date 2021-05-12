import React, { useReducer } from 'react'
import Marcador from './Marcador'

const createArray = (n) => Array.from(Array(n))

const makeBoard = ({rows, cols}) => {
    const board = createArray(rows).map(() => (
        createArray(cols).map(() => (
            {visibility: false, info: 0, state: ""}
        )))
    )

    const randomCell = () => {
        return {row: Math.floor(Math.random() * rows),
                col: Math.floor(Math.random() * rows)}
    }

    for (let i = 0; i < 8; i++) {
        const {row, col} = randomCell()
        if (board[row][col].info !== "virus") {
            board[row][col].info = "virus"
        }else {
            i--;
        }
    }

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            const cell = board[i][j]

            if (cell.info === "virus") {
                continue
            }

            const movesAxis = [-1, 0, 1]
            let nearVirus = 0

            for (const dx of movesAxis) {
                for (const dy of movesAxis) {
                    if (board[i + dx]?.[j + dy]?.info === "virus") {
                        ++nearVirus
                    }
                }
            }

            cell.info = nearVirus
        }
    }
    return board
}


const reducer = (board, action) => {
    const {type, i, j} = action

    if (type === "setVisible") {
        let newBoard = [...board]
        let cell = newBoard[i][j]
        cell.visibility = true
        
        newBoard[0][0].state = "playing"

        if (typeof cell.info === 'number') {

            if (cell.info === 0) {
                const movesAxis = [-1, 0, 1]

                for (const dx of movesAxis) {
                    for (const dy of movesAxis) {
                        if (typeof newBoard[i + dx]?.[j + dy]?.info === 'number') {
                            newBoard[i + dx][j + dy].visibility = true
                        }
                    }
                }
            }

        }else if (cell.info === "virus") {
            const newBoard = [...board]
            for (const row of newBoard) {
                for (const cell of row) {
                    if (cell.info === "virus") {
                        cell.visibility = true
                    }
                    cell.state = "lose"
                }
            }
        }

        let cont = 0;

        for (const row of newBoard) {
            for (const cell of row) {
                if (cell.visibility === true) {
                    cont++
                }
            }
        }
 
        if (cont === 56){
            newBoard[0][0].state = "win"
        }

        return newBoard
    }else if (type === "newGame") {
        const newBoard = makeBoard({rows: 8, cols: 8})
        return newBoard
    }

    return board
}

const Board = () => {
    const initialValue = () => makeBoard({rows: 8, cols: 8})

    const [board, dispatchBoard] = useReducer(reducer, [], initialValue)

    const changeBoard = (i,j) => {
        dispatchBoard({type: "setVisible", i, j})
    }

    const state = board[0][0].state

    return (
        <>
            <Marcador newGame={() => dispatchBoard({type: "newGame",})} state={state}/>
            {state === "win" ? 
                <span className="text-3xl text-white mt-1">You Win</span> 
                : state === "lose" ? 
                    <span className="text-3xl text-white mt-1">You Lose</span> 
                : "" 
            }
            <section className=" w-72 h-72 flex flex-col mt-6">
                {board.map((row, i) => (
                    <div key={`r-${i}`} className="flex flex-row w-full h-full">
                        {row.map(({visibility, info}, j) =>(
                            <button disabled={Boolean(state === "win" || state=== "lose" || (visibility && info === 0))} onClick={() => changeBoard(i, j)} key={`${i} ${j}`} className={`border border-white ${visibility ? "bg-gray-400 ": "bg-gray-700"} rounded-md text-center w-1/6`}>
                                {visibility? info === "virus"? "💣" : info === 0 ? "" : info : ""}
                            </button>
                        ))}
                    </div>
                ))}
            </section>
        </>
    )
    
}

export default Board
