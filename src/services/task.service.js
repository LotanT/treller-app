import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'

export const taskService = {
    getTaskById

}


function getTaskById(boardId,groupId,taskId) {
    return storageService.getTask(STORAGE_KEY, boardId, groupId, taskId)
}






