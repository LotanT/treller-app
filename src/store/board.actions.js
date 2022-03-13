import { boardService } from "../services/boards.service";
import { taskService } from "../services/task.service";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function loadBoards() {

    return async dispatch => {
        try {
            const boards = await boardService.query()
            dispatch({
                type: 'SET_BOARDS',
                boards
            })

        } catch (err) {
            showErrorMsg('Cannot load boards')
        }
    }
}

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({
                type: 'SET_BOARD',
                board
            })
            showSuccessMsg('Board set')

        } catch (err) {
            showErrorMsg('Cannot load boards')
        }
    }
}

export function onRemoveBoard(boardId) {
    return async (dispatch, getState) => {
        try {
            await boardService.remove(boardId)
            dispatch({
                type: 'REMOVE_BOARD',
                boardId
            })
            showSuccessMsg('Board removed')
        }
        catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }
}

export function onAddBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            console.log('Added Board', savedBoard);
            dispatch({
                type: 'ADD_BOARD',
                board: savedBoard
            })
            showSuccessMsg('Board added')


        }
        catch (err) {
            showErrorMsg('Cannot add board')
            console.log('Cannot add board', err)
        }
    }
}

export function onEditBoard(boardToSave) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(boardToSave)
            dispatch({
                type: 'UPDATE_BOARD',
                board: savedBoard
            })
        }
        catch (err) {
            showErrorMsg('Cannot update board');
        }
    }
}
