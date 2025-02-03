export const getCharacter = file => String.fromCharCode(file + 96);

export const createPosition = () => {
    const position = new Array(8).fill('').map(x=>new Array(8).fill(''))

    // White pieces
    position[0][0] = 'wr';  // White Rook
    position[0][1] = 'wn';  // White Knight
    position[0][2] = 'wb';  // White Bishop
    position[0][3] = 'wq';  // White Queen
    position[0][4] = 'wk';  // White King
    position[0][5] = 'wb';  // White Bishop
    position[0][6] = 'wn';  // White Knight
    position[0][7] = 'wr';  // White Rook
    // for (let i = 0; i < 8; i++) {
    //     position[1][i] = 'wp';  // White Pawns
    // }

    // Black pieces
    position[7][0] = 'br';  // Black Rook
    position[7][1] = 'bn';  // Black Knight
    position[7][2] = 'bb';  // Black Bishop
    position[7][3] = 'bq';  // Black Queen
    position[7][4] = 'bk';  // Black King
    position[7][5] = 'bb';  // Black Bishop
    position[7][6] = 'bn';  // Black Knight
    position[7][7] = 'br';  // Black Rook
    // for (let i = 0; i < 8; i++) {
    //     position[6][i] = 'bp';  // Black Pawns
    // }
    
    return position
}

export const copyPosition = position => {
    const newPosition = new Array(8).fill('').map(x=>new Array(8).fill(''))

    for(let rank = 0;rank < 8;rank++){
        for(let file = 0;file < 8;file++){
            newPosition[rank][file] = position[rank][file]
        }
    }
    return newPosition
}