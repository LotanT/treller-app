import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


// import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'

export const taskService = {
    getTaskById

}

function getTaskById(board, taskId) {
    if(!board) return 
    for (let i = 0; i < board.groups.length; i++) {
        for (let j = 0; j < board.groups[i].tasks.length; j++) {
            if (board.groups[i].tasks[j].id === taskId) {
                console.log('task from TaskService:', board.groups[i].tasks[j])
                return board.groups[i].tasks[j]
            }   
        }
    }
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







