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


async function query() {
    const boards = await httpService.get('board')
    return boards
}

async function getById(boardId) {
    const board = await httpService.get(`board/${boardId}`)

    return board
}


async function save(board) {
    if (board._id) {

        const updatedBoard = await httpService.put('board', board)
        socketService.emit("board-update", board._id)
        return updatedBoard

    } else {
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
                "bgImg": board.background
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




