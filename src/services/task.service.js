import { GrUp } from 'react-icons/gr'
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
    removeLabel,
    addGroup,
    updateGroups,
    saveDueDateToTask,
    removeDueDateToTask,
    toggleCoverToTask
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
            if (group.tasks) {
                group.tasks.push(task);
            } else group.tasks = [task]
        }
    });
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

function addLabelToBoard(board, color, title = null) {
    const newLabel = {
        "id": utilService.makeId(),
        "title": title,
        "color": color
    }
    board.labels.push(newLabel)
    return board
}

function toggleLabelToTask(board, taskId, label) {

    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                if (!task.labels) {
                    task.labels = []
                    console.log('EMPTY LABELSIDS~!');
                }

                let isExist = task.labels.some(taskLabel => taskLabel.id == label.id)

                if (isExist) {
                    task.labels = [...task.labels.filter(taskLabel => taskLabel.id !== label.id)]

                }
                else {
                    task.labels.push(label)
                }
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

function addGroup(board, groupTitle) {
    const group = {
        id: utilService.makeId(),
        title: groupTitle,
        style: {},
        isArchive: false,
        tasks: []
    }
    board.groups.push(group)
    return board;
}

function updateGroups(board, groups) {
    board.groups = groups
    return board
}



function saveDueDateToTask(board, taskId, dueDate) {
    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                task.dueDate = dueDate

            }
            return task
        })

        return group.tasks
    })
    return board
}



function removeDueDateToTask(board, taskId) {
    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                task.dueDate = null
            }
            return task
        })

        return group.tasks
    })
    return board

}

function toggleCoverToTask(board, taskId, cover) {
    board.groups.map(group => {
        group.tasks = group.tasks.map(task => {
            if (task.id === taskId) {
                if (!task.style) {
                    task.style = { bgColor: null, img: null }
                    console.log('EMPTY LABELSIDS~!');
                }else task.style.bgColor = cover;
            }
            return task
        })

        return group.tasks
    })
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






