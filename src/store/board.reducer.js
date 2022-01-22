const initialState = {
    boards: [],  //mini boards
    board: null,

}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards

    switch (action.type) {
        case 'SET_BOARDS':
            // console.log(action.boards);
            newState = { ...state, boards: action.boards }
            break
        case 'SET_BOARD':
            // console.log(action.board);
            newState = { ...state, board: action.board }
            break
        case 'REMOVE_BOARD':
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'UPDATE_BOARD':
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break
        case 'ADD_GROUP':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'UPDATE_GROUP':
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break


        default:
    }






    // For debug:
    window.boardState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
