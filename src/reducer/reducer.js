import { Status } from "../constant"
import actionType from "./actionType"

export const reducer = (state,action) => {
    switch(action.type){
        case actionType.NEW_MOVE : {

            let {turn,position} = state

            turn = turn === 'w' ? 'b' : 'w'

            position = [
                ...position,
                action.payload.newPosition
            ]

            return {
                ...state,
                turn,
                position 
            }
        }
        case actionType.GENERATE_CANDIDATE_MOVES : {
            return{
                ...state,
                candidateMoves : action.payload.candidateMoves
            }
        }
        case actionType.CLEAR_CANDIDATE_MOVES : {
            return{
                ...state,
                candidateMoves : []
            }
        }
        case actionType.PROMOTION_OPEN : {
            console.log("PROMOTION_OPEN payload:", action.payload)
            return{
                ...state,
                status : Status.promoting,
                promotionSquare : {...action.payload}
            }
        }
        case actionType.PROMOTION_CLOSE : {
            return{
                ...state,
                status : Status.ongoing,
                promotionSquare : null
            }
        }
        default:
            return state
    }
}