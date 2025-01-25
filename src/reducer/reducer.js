import actionType from "./actions/actionType"

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
        default:
            return state
    }
}