import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getNewBoard,



}
window.cs = boardService;
_createBoards()

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}
function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}
function save(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        // board.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, board)
    }
}

function getNewBoard(title) {
    return {

        "title": title,
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {},
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "isArchive": false
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "isArchive": false
                    }
                ],
                "style": {},
                "isArchive": false
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "isArchive": false

                    },
                ],
                "style": {
                },
                "isArchive": false
            },
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo",

                }
            }
        ],
        "style": {
            "bgImg": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/b95de2cf239d179275031cf5eefc799d/photo-1642076573338-9bc6a667fe57.jpg"
        },
        "isStarred": false

    }
}



function _createBoards() {
    let boards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    if (!boards.length) {
        boards = [
            {
                "_id": "b101",
                "title": "Robot dev proj",
                "createdAt": 1589983468418,
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "style": {},
                "labels": [
                    {
                        "id": "l101",
                        "title": "Done",
                        "color": "#61bd4f"
                    },
                    {
                        "id": "l102",
                        "title": "Note",
                        "color": "#f2d600"
                    },
                    {
                        "id": "l103",
                        "title": null,
                        "color": "#ff9f1a"
                    },
                    {
                        "id": "l104",
                        "title": "Important",
                        "color": "#eb5a46"
                    },
                    {
                        "id": "l105",
                        "title": null,
                        "color": "#c377e0"
                    },
                    {
                        "id": "l106",
                        "title": "Cool",
                        "color": "#0079bf"
                    },
                    {
                        "id": "l107",
                        "title": "Cool",
                        "color": "#51e898"
                    },
                    {
                        "id": "l108",
                        "title": null,
                        "color": "#ff78cb"
                    },
                    {
                        "id": "l109",
                        "title": null,
                        "color": "#344563"
                    },
                    {
                        "id": "l110",
                        "title": null,
                        "color": "##b3bac5"
                    }
                ],
                "members": [
                    {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "https://www.google.com"
                    }
                ],
                "groups": [
                    {
                        "id": "g101",
                        "title": "Group 1",
                        "tasks": [
                            {
                                "id": "c101",
                                "title": "Replace logo",
                                "isArchive": false, "isDone": false
                            },
                            {
                                "id": "c102",
                                "title": "Add Samples",
                                "isArchive": false, "isDone": false
                            }
                        ],
                        "style": {},
                        "isArchive": false
                    },
                    {
                        "id": "g102",
                        "title": "Group 2",
                        "tasks": [
                            {
                                "id": "c103",
                                "title": "Do that",
                                "isArchive": false, "isDone": false

                            },
                            {
                                "id": "c104",
                                "title": "Help me",
                                "status": "in-progress", "isDone": false,
                                "description": "description",
                                "comments": [
                                    {
                                        "id": "ZdPnm",
                                        "txt": "also @yaronb please CR this",
                                        "createdAt": 1590999817436.0,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Tal Tarablus",
                                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                        }
                                    }
                                ],
                                "checklists": [
                                    {
                                        "id": "YEhmF",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "212jX",
                                                "title": "To Do 1",
                                                "isDone": false
                                            }, {
                                                "id": "213jX",
                                                "title": "To Do 1",
                                                "isDone": false
                                            }
                                        ],
                                    },
                                    {
                                        "id": "YEhmF",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "212jX",
                                                "title": "To Do 1",
                                                "isDone": false
                                            }
                                        ],
                                    }
                                ],
                                "members": [
                                    {
                                        "_id": "u101",
                                        "username": "Tal",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    }
                                ],
                                "labelIds": ["l101", "l102"],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                                "style": {
                                    "bgColor": "#26de81"
                                },
                                "isArchive": false
                            }
                        ],
                        "style": {
                        },
                        "isArchive": false
                    },
                ],
                "activities": [
                    {
                        "id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Abi Abambi",
                            "imgUrl": "http://some-img"
                        },
                        "task": {
                            "id": "c101",
                            "title": "Replace Logo",

                        }
                    }
                ],
                "style": {
                    "bgImg": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/b95de2cf239d179275031cf5eefc799d/photo-1642076573338-9bc6a667fe57.jpg"
                },
                "isStarred": false
            },
            {
                "_id": "b102",
                "title": "Robot dev proj",
                "createdAt": 1589983468418,
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "style": {},
                "labels": [
                    {
                        "id": "l101",
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
                "members": [
                    {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "https://www.google.com"
                    }
                ],
                "groups": [
                    {
                        "id": "g101",
                        "title": "Group 1",
                        "tasks": [
                            {
                                "id": "c101",
                                "title": "Replace logo",
                                "img": "https://static01.nyt.com/images/2022/01/05/technology/personaltech/05TECHTIP-GIF/05TECHTIP-GIF-mobileMasterAt3x.gif",
                                "isArchive": false, "isDone": false
                            },
                            {
                                "id": "c102",
                                "title": "Add Samples",
                                "isArchive": false, "isDone": false
                            }
                        ],
                        "style": {},
                        "isArchive": false
                    },
                    {
                        "id": "g102",
                        "title": "Group 2",
                        "tasks": [
                            {
                                "id": "c103",
                                "title": "Do that",
                                "isArchive": false, "isDone": false

                            },
                            {
                                "id": "c104",
                                "title": "Help me", "isDone": false,
                                "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbMZUssCb25YW6rL-kAkjfR7EgUkdCJoIFgw&usqp=CAU",
                                "status": "in-progress",
                                "description": "description",
                                "comments": [
                                    {
                                        "id": "ZdPnm",
                                        "txt": "also @yaronb please CR this",
                                        "createdAt": 1590999817436.0,
                                        "byMember": {
                                            "_id": "u101",
                                            "fullname": "Tal Tarablus",
                                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                        }
                                    }
                                ],
                                "checklists": [
                                    {
                                        "id": "YEhdsfgmF",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "2123etwjX",
                                                "title": "To Do 1",
                                                "isDone": false
                                            }, {
                                                "id": "212gfdjX",
                                                "title": "To Do 1",
                                                "isDone": false
                                            }
                                        ],
                                    },
                                    {
                                        "id": "YEhmF",
                                        "title": "Checklist",
                                        "todos": [
                                            {
                                                "id": "2df12jX",
                                                "title": "To Do 1",
                                                "isDone": false
                                            }
                                        ],
                                    }
                                ],
                                "members": [
                                    {
                                        "_id": "u101",
                                        "username": "Tal",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    }
                                ],
                                "labelIds": ["l101", "l102"],
                                "createdAt": 1590999730348,
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                                "style": {
                                    "bgColor": "#26de81",
                                    "img": "https://cdn.pixabay.com/photo/2018/09/30/16/26/sun-3713835__340.jpg",
                                },
                                "isArchive": false
                            }
                        ],
                        "style": {
                        },
                        "isArchive": false
                    },
                ],
                "activities": [
                    {
                        "id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Abi Abambi",
                            "imgUrl": "http://some-img"
                        },
                        "task": {
                            "id": "c101",
                            "title": "Replace Logo",

                        }
                    }
                ],
                "style": {
                    "bgImg": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/b95de2cf239d179275031cf5eefc799d/photo-1642076573338-9bc6a667fe57.jpg"
                },
                "isStarred": true
            },
        ]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
    }
    console.log('boards:', boards)

}




// function subscribe(listener) {
//     listeners.push(listener)
// }

// function _notifySubscribersBoardsChanged(boards) {
//     console.log('Notifying Listeners');
//     listeners.forEach(listener => listener(boards))
// }

// window.addEventListener('storage', () => {
//     console.log('Storage Changed from another Browser!');
//     query()
//         .then(boards => {
//             _notifySubscribersBoardsChanged(boards)
//         })
// })

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




