import { getCharacter } from '../../helper';
import './ChessBoard.css';
import Ranks from './bits/Ranks'
import Files from './bits/Files'
import Pieces from './Pieces/Pieces';
import { useAppContext } from '../../contexts/context';


const ChessBoard = () => {

    const { appState } = useAppContext()
    const position = appState.position[appState.position.length - 1]

    const getClassName = (i, j) => {
        let c = 'tile';
        c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light'

        if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
            if (position[i][j]) {
                c += ' attacking'
            }
            else {
                c += ' highlight'
            }
        }

        return c
    }

    const ranks = Array(8).fill().map((x, i) => 8 - i)
    const files = Array(8).fill().map((x, i) => i + 1)

    return (
        <div className='board'>

            <Ranks ranks={ranks}></Ranks>

            <div className="tiles">
                {ranks.map((rank, i) =>
                    files.map((file, j) =>
                        <div key={file + '-' + rank} className={getClassName(7 - i, j)}></div>
                    )
                )}
            </div>

            <Pieces></Pieces>

            <Files files={files}></Files>

        </div>
    )
}

export default ChessBoard