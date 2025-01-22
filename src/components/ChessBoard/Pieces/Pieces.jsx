import './Pieces.css'
import Piece from './Piece'
import { useState } from 'react'
import { createPosition, copyPosition} from '../../../helper'
import { useRef } from 'react'

const Pieces = () => {

    const ref = useRef()

    const calcCords = (e) => {
        const {width,top,left} = ref.current.getBoundingClientRect()
        const size = width/8
        const y = Math.floor((e.clientX - left) / size) 
        const x = 7 - Math.floor((e.clientY - top) / size)
        return {x,y}
    }

    const [state, setState] = useState(createPosition())

    const onDrop = e => {
        e.preventDefault()
        const newPosition = copyPosition(state)
        const {x,y} = calcCords(e)

        const [p, rank, file] = e.dataTransfer.getData('text').split(',')

        newPosition[rank][file] = ''
        newPosition[x][y] = p

        setState(newPosition)
    }

    const onDragOver = e => {
        e.preventDefault()
    }

    return <div className='pieces' onDrop={onDrop} onDragOver={onDragOver} ref={ref}>
        {state.map((r, rank) =>
            r.map((f, file) =>
                state[rank][file]
                    ? <Piece
                        key={rank + '-' + file}
                        rank={rank}
                        file={file}
                        piece={state[rank][file]}
                    ></Piece>
                    : null
            ))}
    </div>
}

export default Pieces