import { boardService } from "../services/boards.service";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function loadBoards() {
    return async dispatch => {
        try {
            const boards = await boardService.query()
            console.log('Boards from DB:', boards)
            dispatch({
                type: 'SET_BOARDS',
                boards
            })

        } catch (err) {
            showErrorMsg('Cannot load boards')
            console.log('Cannot load boards', err)
        }
    }
}

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            console.log('hi')
            const boards = await boardService.getById(boardId)
            console.log('Boards from DB:', boards)
            dispatch({
                type: 'SET_BOARDS',
                boards
            })

        } catch (err) {
            showErrorMsg('Cannot load boards')
            console.log('Cannot load boards', err)
        }
    }
}

export function onRemoveBoard(boardId) {
    return async (dispatch, getState) => {
        try {
            await boardService.remove(boardId)
            console.log('Deleted Succesfully!');
            dispatch({
                type: 'REMOVE_BOARD',
                boardId
            })
            showSuccessMsg('Board removed')
        }
        catch (err) {
            showErrorMsg('Cannot remove board')
            console.log('Cannot remove board', err)
        }
    }
}

export function onAddBoard() {
    return async (dispatch) => {
        try {
            const board = boardService.getEmptyBoard();
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
            console.log('Updated Board:', savedBoard);
            boardService.save(boardToSave);
            dispatch({
                type: 'UPDATE_BOARD',
                board: savedBoard
            })
        }
        catch (err) {
            showErrorMsg('Cannot update board');
            console.log('Cannot save board', err);
        }
    }
}
