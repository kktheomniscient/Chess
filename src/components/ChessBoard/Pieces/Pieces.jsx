import './Pieces.css'
import Piece from './Piece'
import { useState } from 'react'
import { createPosition, copyPosition} from '../../../helper'
import { useRef } from 'react'
import { useAppContext } from '../../../contexts/context'
import { clearCandidatesMoves, makeNewMove } from '../../../reducer/actions/move'

const Pieces = () => {

    const ref = useRef()

    const {appState,dispatch} = useAppContext()

    const currentPosition = appState.position[appState.position.length-1]

    const calcCords = (e) => {
        const {width,top,left} = ref.current.getBoundingClientRect()
        const size = width/8
        const y = Math.floor((e.clientX - left) / size) 
        const x = 7 - Math.floor((e.clientY - top) / size)
        return {x,y}
    }

    const onDrop = e => {
        e.preventDefault()
        const newPosition = copyPosition(currentPosition)
        const {x,y} = calcCords(e)

        const [p, rank, file] = e.dataTransfer.getData('text').split(',')

        if (appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){
            newPosition[rank][file] = ''
            newPosition[x][y] = p
            dispatch(makeNewMove({newPosition}))
        }

        dispatch(clearCandidatesMoves())
    }

    const onDragOver = e => {
        e.preventDefault()
    }

    return <div className='pieces' onDrop={onDrop} onDragOver={onDragOver} ref={ref}>
        {currentPosition.map((r, rank) =>
            r.map((f, file) =>
                currentPosition[rank][file]
                    ? <Piece
                        key={rank + '-' + file}
                        rank={rank}
                        file={file}
                        piece={currentPosition[rank][file]}
                    ></Piece>
                    : null
            ))}
    </div>
}

export default Pieces