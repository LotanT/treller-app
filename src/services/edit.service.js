import {store} from './store';
const state = store.getState();
// const authToken = state.currentUser.token;

window.state = state;

function getTaskById(groupId, taskId) {
    (entities.find(entity => entity._id === entityId))
}