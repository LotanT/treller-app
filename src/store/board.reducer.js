const initialState = {
    boards: [],  //mini boards
    board: {
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
                    {
                        "id": "c104",
                        "title": "Help me",
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
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }, {
                                        "id": "212jX",
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
                "style": {},
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
    }
}
export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
         case 'SET_BOARD':
                newState = { ...state, boards: action.boards }
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
