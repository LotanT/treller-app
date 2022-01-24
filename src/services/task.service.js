import { onEditBoard } from '../store/board.actions'
import { utilService } from './util.service'


export const taskService = {
    getTaskById,
    updateTask,
    addTask,
    editGroupTitle,
    createNewTaskList,
    getLabels,
    toggleLabelToTask,
    addLabelToBoard,
    updateLabel,
    removeLabel
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
            group.tasks.push(task);
        }
    });
    console.log(board);
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


function editGroupTitle(board, groupId, groupTitle) {
    board.groups.map((group) => {
        if (group.id === groupId) {
            group.title = groupTitle
        }
    });
    return board;
}

function getLabels(board) {
    if (board.labels) {
        return board.labels
    }
}

function addLabelToBoard(board,color,title=null) {
    const newLabel = {
        "id": utilService.makeId(),
        "title": title,
        "color": color
    }
    board.labels.push(newLabel)
    return board
}

function toggleLabelToTask(board, taskId, labelId) {

    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            console.log(task);
            if (task.id === taskId) {
                if (!task.labelIds) {
                    task.labelIds = []
                    console.log('EMPTY LABELSIDS~!');
                }

                let isExist = task.labelIds.some(id => id === labelId)
                console.log('isExist:', isExist);

                if (isExist) {
                    task.labelIds = [...task.labelIds.filter(id => id !== labelId)]
                    console.log('task.labelIds:', task.labelIds)

                }
                else {
                    task.labelIds.push(labelId)
                }
                console.log('task.labelIds:', task.labelIds)
            }
            return task
        })

        return group.tasks
    })
    return board
}

function updateLabel(board, updatedLabel) {
    board.labels = [...board.labels.map(label => label.id === updatedLabel.id ? updatedLabel : label)]
    return board

}

function removeLabel(board, labelToRemove) {
    board.labels = [...board.labels.filter(label => label.id !== labelToRemove.id)]
    return board

}




// function toggleLabelToTask(board, taskId, labelId) {
//     const task = getTaskById(board, taskId)
//     if (task) {
//         if (!task.labelIds) {
//             task.labelIds = []
//             console.log('EMPTY LABELSIDS~!');
//         }

//         let isExist = task.labelIds.some(id => id == labelId)
//         console.log('isExist:', isExist);

//         if (isExist) {
//             task.labelIds = task.labelIds.filter(id => id !== labelId)
//             console.log('task.labelIds:', task.labelIds)

//         }
//         else {
//             task.labelIds.push(labelId)
//         }
//         console.log('task.labelIds:', task.labelIds)
//     }
//     console.log('task:' ,task)
// }






