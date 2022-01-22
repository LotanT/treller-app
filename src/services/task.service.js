import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import store from '../store/store.js';

// import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'

export const taskService = {
    getBoard,
    getTaskById

}

function getTaskById(taskId) {
    const board = getBoard()
    console.log(board);
    if(!board.groups) return
    for (let i = 0; i < board.groups.length; i++) {
        for (let j = 0; j < board.groups[i].tasks.length; j++) {
            if (board.groups[i].tasks[j].id === taskId) {
                console.log('task from TaskService:', board.groups[i].tasks[j])
                return board.groups[i].tasks[j]
            }
        }
    }
}



function getBoard() {
    const state = store.getState()
    if (state.boardModule.board) return state.boardModule.board
    return setTimeout(() => {
        const state = store.getState();
        console.log(state.boardModule.board);
        return state.boardModule.board
    }, 1000)

}










// function getTaskById(boardId){
//     const state = store.getState();
//     // const authToken = state.currentUser.token;

//     // Pass the token to the server
//     return fetch(`/${boardId}`, {
//       method: 'GET',
//     }).then(res => res.json());

// }

// async function getTaskById(boardId, taskId) {
//     const board = await storageService.get(STORAGE_KEY, boardId)
//     for (let i = 0; i < board.groups.length; i++) {
//         for(let j=0; j<board.groups[i].tasks.length;j++){
//             if(board.groups[i].tasks[j].id===taskId){
//                 console.log('task from TaskService:', board.groups[i].tasks[j])
//                 return board.groups[i].tasks[j]
//             }
//         }
//     }

// }







