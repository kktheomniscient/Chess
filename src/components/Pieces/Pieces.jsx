import './Pieces.css'
import Piece from './Piece'
import { useRef } from 'react'
import { useAppContext } from '../../contexts/context'
import { clearCandidatesMoves, makeNewMove } from '../../reducer/actions/move'
import arbiter from '../../arbiter/arbiter'
import { openPromotion } from '../../reducer/actions/popup'

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

    const openPromotionBox = ({rank,file,x,y}) => {
        console.log("openPromotionBox called with:", { rank, file, x, y });
        dispatch(openPromotion({
            rank : Number(rank),
            file : Number(file),
            x,y
        }))
    }

    const move = (e) => {
        const {x,y} = calcCords(e)
        const [piece, rank, file] = e.dataTransfer.getData('text').split(',')
        // console.log(`Moving piece: ${piece} from (${rank}, ${file}) to (${x}, ${y})`)
        if (appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){
            if((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)){
                openPromotionBox({rank,file,x,y})
                return 
            }
            const newPosition = arbiter.performMove({
                position : currentPosition,
                piece,rank,file,
                x,y
            })
            dispatch(makeNewMove({newPosition}))
        }
        dispatch(clearCandidatesMoves())
    }

    const onDrop = e => {
        e.preventDefault()
        move(e)
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