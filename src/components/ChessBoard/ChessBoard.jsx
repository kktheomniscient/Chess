import { getCharacter } from '../../helper';
import './ChessBoard.css';
import Ranks from './bits/Ranks'
import Files from './bits/Files'


const ChessBoard = () => {

    const getClassName = (i,j) => {
        let c = 'tile';
        c += (i+j)%2 === 0 ? ' tile--light' : ' tile--dark'
        return c
    }

    const ranks = Array(8).fill().map((x,i) => 8-i)
    const files = Array(8).fill().map((x,i) => getCharacter(i))

    return (
        <div className='board'>

            <Ranks ranks={ranks}></Ranks>

            <div className="tiles">
                {ranks.map((rank,i) => 
                    files.map((file,j) => 
                        <div key={file+'-'+rank} className={getClassName(i,j)}></div>
                    )
                )}
            </div>

                <Files files={files}></Files>

        </div>
    )
}

export default ChessBoard