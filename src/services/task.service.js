import { GrUp } from 'react-icons/gr'
import { onEditBoard } from '../store/board.actions'
import { utilService } from './util.service'


export const taskService = {
  getTaskById,
  updateTask,
  addTask,
  editGroupTitle, 
  createNewTaskList,
  addGroup,
  updateGroups
}

function getTaskById(board, taskId) {
    if (!board) return
    for (let i = 0; i < board.groups.length; i++) {
        for (let j = 0; j < board.groups[i].tasks.length; j++) {
            if (board.groups[i].tasks[j].id === taskId) {
                return board.groups[i].tasks[j]
            }
        }
    }
}


function updateTask(board, updatedTask) {
    board.groups.tasks = board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            return task.id === updatedTask.id ? updatedTask : task
        })
        return group.tasks
    })
    return board

}

function addTask(board, groupId, title) {
    const task = {
        id: utilService.makeId(),
        isArchive: false,
        title,
    };
    board.groups.map((group) => {
        if (group.id === groupId) {
          if(group.tasks){
            group.tasks.push(task);
          } else group.tasks = [task]
        }
    });
    // console.log(board);
    return board;
}



function createNewTaskList(board, taskId, title = "New Check List") {
    const newTask =
    {
        "id": utilService.makeId(),
        "title": title,
        "todos": [
            {
                "id": utilService.makeId(),
                "title": undefined,
                "isDone": false
            }
        ],
    }

    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                if (!task.checklists) task.checklists = []
                task.checklists.push(newTask)
            }
            return task
        })

        return group.tasks

    })
    return board
}


function editGroupTitle (board,groupId,groupTitle){
  board.groups.map((group) => {
    if (group.id === groupId) {
      group.title = groupTitle
    }
  });
  // console.log(board);
  return board;
}

function addGroup (board, groupTitle){
  const group ={
    id: utilService.makeId(),
    title: groupTitle,
    style: {},
    isArchive: false
  }
  board.groups.push(group)
  return board;
}

function updateGroups (board,groups){
  board.groups = groups
  return board
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







