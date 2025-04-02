import { useAppContext } from "../../../contexts/context";
import { copyPosition } from "../../../helper";
import { clearCandidatesMoves, makeNewMove } from "../../../reducer/actions/move";
import "./PromotionBox.css";

const PromotionBox = ({onClosePopup}) => {
    const options = ['q', 'r', 'b', 'n']

    const {appState,dispatch} = useAppContext()
    const {promotionSquare} = appState

    if(!promotionSquare)
        return null

    const color = promotionSquare.x === 7 ? 'w' : 'b'
    console.log(promotionSquare)

    const getPromotionPosition = () => {
        let style = {}

        if(color === 'w'){
            style.top = '-5.5%'
        }
        else{
            style.top = '90.5%'
        }

        if(promotionSquare.y <= 1)
            style.left = '0%'
        else if(promotionSquare.y >= 6)
            style.right = '0%'
        else
            style.left = `${12.5*promotionSquare.y - 20}%`
        return style
    }

    const onClick = option => { 
        onClosePopup()
        const newPosition = copyPosition(appState.position[appState.position.length-1])
        
        newPosition[promotionSquare.rank][promotionSquare.file] = ''
        newPosition[promotionSquare.x][promotionSquare.y] = color + option 

        dispatch(clearCandidatesMoves())
        dispatch(makeNewMove({newPosition}))
    }

    return <div className="popup-inner promotion-choices" style={getPromotionPosition()}>
        {options.map(option => <div key={option} className={`piece ${color}${option}`} onClick = {() => onClick(option)}></div>)}
    </div>
}

export default PromotionBox;