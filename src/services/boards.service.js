import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
// import { userService } from './user.service.js'
import { socketService, SOCKET_EVENT_BOARD_ADDED } from './socket.service'


const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getById,
    save,
    getNewBoard,

}
// window.cs = boardService;
// _createBoards()

async function query() {
    // return storageService.query(STORAGE_KEY)

    // return httpService.get(`board`)
    const boards = await httpService.get('board')
    return boards
}

async function getById(boardId) {
    // return storageService.get(STORAGE_KEY, boardId)
    const board = await httpService.get(`board/${boardId}`)

    return board
}

// function remove(boardId) {
//     return storageService.remove(STORAGE_KEY, boardId)
// }

async function save(board) {
    if (board._id) {
        // return storageService.put(STORAGE_KEY, board)

        const updatedBoard = await httpService.put('board', board)
        socketService.emit("board-update", board._id)
        return updatedBoard

    } else {
        // return storageService.post(STORAGE_KEY, board)
        let user = userService.getLoggedinUser() || null
        const newBoard = {
            "title": board.title,
            "createdAt": Date.now(),
            "createdBy": null,
            "labels": [
                {
                    "id": "l1sdggds01",
                    "title": "Done",
                    "color": "#61bd4f"
                },
                {
                    "id": "l102",
                    "title": "Note",
                    "color": "#f2d600"
                },
                {
                    "id": "l104",
                    "title": "Important",
                    "color": "#eb5a46"
                }
            ],
            "members": [],
            "groups": [],
            "activities": [],
            "style": {
                "bgImg": "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg"
            },
            "isStarred": false,
            "byUserId": (user?._id) ? user._id : "61f2c40f9faf574c74ecac86"

        }
        const savedBoard = await httpService.post('board', newBoard)
        socketService.emit(SOCKET_EVENT_BOARD_ADDED, savedBoard)
        return savedBoard
    }
}



function getNewBoard(title) {
    return {

        "title": title,
        "createdAt": Date.now(),
        "createdBy": null,
        "style": {},
        "labels": [
            {
                "id": "l1sdggds01",
                "title": "Done",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "Note",
                "color": "#f2d600"
            },
            {
                "id": "l104",
                "title": "Important",
                "color": "#eb5a46"
            }
        ],
        "members": [],
        "groups": [],
        "activities": [],
        "style": {
            "bgImg": "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg"
        },
        "isStarred": false
    }
}



// function _createBoards() {
//     let boards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
//     if (!boards.length) {
//         boards = [
//             {
//                 "_id": "b101",
//                 "title": "Robot dev proj",
//                 "createdAt": 1589983468418,
//                 "createdBy": {
//                     "_id": "u101",
//                     "fullname": "Abi Abambi",
//                     "imgUrl": "http://some-img"
//                 },
//                 "style": {},
//                 "labels": [
//                     {
//                         "id": "l101",
//                         "title": "Done",
//                         "color": "#61bd4f"
//                     },
//                     {
//                         "id": "l102",
//                         "title": "Note",
//                         "color": "#f2d600"
//                     },
//                     {
//                         "id": "l103",
//                         "title": null,
//                         "color": "#ff9f1a"
//                     },
//                     {
//                         "id": "l104",
//                         "title": "Important",
//                         "color": "#eb5a46"
//                     },
//                     {
//                         "id": "l105",
//                         "title": null,
//                         "color": "#c377e0"
//                     },
//                     {
//                         "id": "l106",
//                         "title": "Cool",
//                         "color": "#0079bf"
//                     },
//                     {
//                         "id": "l107",
//                         "title": "Cool",
//                         "color": "#51e898"
//                     },
//                     {
//                         "id": "l108",
//                         "title": null,
//                         "color": "#ff78cb"
//                     },
//                     {
//                         "id": "l109",
//                         "title": null,
//                         "color": "#344563"
//                     },
//                     {
//                         "id": "l110",
//                         "title": null,
//                         "color": "##b3bac5"
//                     }
//                 ],
//                 "members": [
//                     {
//                         "_id": "u101",
//                         "fullname": "Tal Tarablus",
//                         "imgUrl": "https://www.google.com"
//                     }
//                 ],
//                 "groups": [
//                     {
//                         "id": "g101",
//                         "title": "Group 1",
//                         "tasks": [
//                             {
//                                 "id": "c101",
//                                 "title": "Replace logo",
//                                 "isArchive": false, "isDone": false,
//                                 "style": {
//                                     "cover": null
//                                 },
//                             },
//                             {
//                                 "id": "c102",
//                                 "title": "Add Samples",
//                                 "isArchive": false, "isDone": false,
//                                 "style": {
//                                     "cover": null
//                                 },
//                             }
//                         ],
//                         "style": {},
//                         "isArchive": false
//                     },
//                     {
//                         "id": "g102",
//                         "title": "Group 2",
//                         "tasks": [
//                             {
//                                 "id": "c103",
//                                 "title": "Do that",
//                                 "isArchive": false, "isDone": false, "dueDate": 1590999817436,
//                                 "style": {
//                                     "cover": null
//                                 },

//                             },
//                             {
//                                 "id": "c104",
//                                 "title": "Help me",
//                                 "status": "in-progress", "isDone": false, "cover": "red",
//                                 "description": "description",
//                                 "comments": [
//                                     {
//                                         "id": "ZdPnm",
//                                         "txt": "also @yaronb please CR this",
//                                         "createdAt": 1590999817436.0,
//                                         "byMember": {
//                                             "_id": "u101",
//                                             "fullname": "Tal Tarablus",
//                                             "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                                         }
//                                     }
//                                 ],
//                                 "checklists": [
//                                     {
//                                         "id": "YEhmF",
//                                         "title": "Checklist",
//                                         "isHide": false,
//                                         "todos": [
//                                             {
//                                                 "id": "212jX",
//                                                 "title": "To Do 1",
//                                                 "isDone": false,
//                                                 "style": {
//                                                     "cover": null
//                                                 },
//                                             }, {
//                                                 "id": "213jX",
//                                                 "title": "To Do 1",
//                                                 "isDone": false,
//                                                 "style": {
//                                                     "cover": null
//                                                 },
//                                             }
//                                         ],
//                                     },
//                                     {
//                                         "id": "YEhgfdgdgmF",
//                                         "title": "Checklist",
//                                         "isHide": false,
//                                         "todos": [
//                                             {
//                                                 "id": "212jX",
//                                                 "title": "To Do 1",
//                                                 "isDone": false,
//                                                 "style": {
//                                                     "cover": null
//                                                 },
//                                             }
//                                         ],
//                                     }
//                                 ],
//                                 "members": [
//                                     {
//                                         "_id": "u101",
//                                         "username": "Tal",
//                                         "fullname": "Tal Tarablus",
//                                         "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                                     }
//                                 ],
//                                 "labels": [],
//                                 "createdAt": 1590999730348,
//                                 "dueDate": 16156215211,
//                                 "byMember": {
//                                     "_id": "u101",
//                                     "username": "Tal",
//                                     "fullname": "Tal Tarablus",
//                                     "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                                 },
//                                 "style": {
//                                     "cover": "#26de81"
//                                 },
//                                 "isArchive": false
//                             }
//                         ],
//                         "style": {
//                         },
//                         "isArchive": false
//                     },
//                 ],
//                 "activities": [
//                     {
//                         "id": "a101",
//                         "txt": "Changed Color",
//                         "createdAt": 154514,
//                         "byMember": {
//                             "_id": "u101",
//                             "fullname": "Abi Abambi",
//                             "imgUrl": "http://some-img"
//                         },
//                         "task": {
//                             "id": "c101",
//                             "title": "Replace Logo",
//                             "style": {
//                                 "cover": null
//                             },

//                         }
//                     }
//                 ],
//                 "style": {
//                     "bgImg": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/b95de2cf239d179275031cf5eefc799d/photo-1642076573338-9bc6a667fe57.jpg"
//                 },
//                 "isStarred": false
//             },
//             {
//                 "_id": "b102",
//                 "title": "Robot dev proj",
//                 "createdAt": 1589983468418,
//                 "createdBy": {
//                     "_id": "u101",
//                     "fullname": "Abi Abambi",
//                     "imgUrl": "http://some-img"
//                 },
//                 "style": {},
//                 "labels": [
//                     {
//                         "id": "l101",
//                         "title": "Done",
//                         "color": "#61bd4f"
//                     },
//                     {
//                         "id": "l102",
//                         "title": "Note",
//                         "color": "#f2d600"
//                     },
//                     {
//                         "id": "l104",
//                         "title": "Important",
//                         "color": "#eb5a46"
//                     }
//                 ],
//                 "members": [
//                     {
//                         "_id": "u101",
//                         "fullname": "Tal Tarablus",
//                         "imgUrl": "https://www.google.com"
//                     }
//                 ],
//                 "groups": [
//                     {
//                         "id": "g101",
//                         "title": "Group 1",
//                         "tasks": [
//                             {
//                                 "id": "c101",
//                                 "title": "Replace logo",
//                                 "img": "https://static01.nyt.com/images/2022/01/05/technology/personaltech/05TECHTIP-GIF/05TECHTIP-GIF-mobileMasterAt3x.gif",
//                                 "isArchive": false, "isDone": false,
//                                 "style": {
//                                     "cover": null
//                                 },
//                             },
//                             {
//                                 "id": "c102",
//                                 "title": "Add Samples",
//                                 "isArchive": false, "isDone": false,
//                                 "style": {
//                                     "cover": null
//                                 },
//                             }
//                         ],
//                         "style": {},
//                         "isArchive": false
//                     },
//                     {
//                         "id": "g102",
//                         "title": "Group 2",
//                         "tasks": [
//                             {
//                                 "id": "c103",
//                                 "title": "Do that",
//                                 "isArchive": false, "isDone": false,
//                                 "style": {
//                                     "cover": null
//                                 },

//                             },
//                             {
//                                 "id": "c104",
//                                 "title": "Help me", "isDone": false, "cover": "red",
//                                 "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbMZUssCb25YW6rL-kAkjfR7EgUkdCJoIFgw&usqp=CAU",
//                                 "status": "in-progress",
//                                 "description": "description",
//                                 "comments": [
//                                     {
//                                         "id": "ZdPnm",
//                                         "txt": "also @yaronb please CR this",
//                                         "createdAt": 1590999817436.0,
//                                         "byMember": {
//                                             "_id": "u101",
//                                             "fullname": "Tal Tarablus",
//                                             "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                                         }
//                                     }
//                                 ],
//                                 "checklists": [
//                                     {
//                                         "id": "YEhdsfgmF",
//                                         "title": "Checklist",
//                                         "isHide": false,
//                                         "todos": [
//                                             {
//                                                 "id": "2123etwjX",
//                                                 "title": "To Do 1",
//                                                 "isDone": false
//                                             }, {
//                                                 "id": "212gfdjX",
//                                                 "title": "To Do 1",
//                                                 "isDone": false
//                                             }
//                                         ],
//                                     },
//                                     {
//                                         "id": "YEhmF",
//                                         "title": "Checklist",
//                                         "isHide": false,
//                                         "todos": [
//                                             {
//                                                 "id": "2df12jX",
//                                                 "title": "To Do 1",
//                                                 "isDone": false
//                                             }
//                                         ],
//                                     }
//                                 ],
//                                 "members": [
//                                     {
//                                         "_id": "u101",
//                                         "username": "Tal",
//                                         "fullname": "Tal Tarablus",
//                                         "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                                     }
//                                 ],
//                                 "labels": [],
//                                 "createdAt": 1590999730348,
//                                 "dueDate": 16156215211,
//                                 "byMember": {
//                                     "_id": "u101",
//                                     "username": "Tal",
//                                     "fullname": "Tal Tarablus",
//                                     "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//                                 },
//                                 "style": {
//                                     "cover": "#26de81",
//                                     "img": "https://cdn.pixabay.com/photo/2018/09/30/16/26/sun-3713835__340.jpg",
//                                 },
//                                 "isArchive": false
//                             }
//                         ],
//                         "style": {
//                         },
//                         "isArchive": false
//                     },
//                 ],
//                 "activities": [
//                     {
//                         "id": "a101",
//                         "txt": "Changed Color",
//                         "createdAt": 154514,
//                         "byMember": {
//                             "_id": "u101",
//                             "fullname": "Abi Abambi",
//                             "imgUrl": "http://some-img"
//                         },
//                         "task": {
//                             "id": "c101",
//                             "title": "Replace Logo",

//                         }
//                     }
//                 ],
//                 "style": {
//                     "bgImg": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/b95de2cf239d179275031cf5eefc799d/photo-1642076573338-9bc6a667fe57.jpg"
//                 },
//                 "isStarred": true
//             },
//         ]
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
//     }
//     console.log('boards:', boards)

// }



