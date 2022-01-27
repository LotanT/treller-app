import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_LOGIN, SOCKET_EMIT_LOGOUT } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    googleLogin
}


function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    gWatchedUser = user;
    return user;
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    if (user) return _saveLocalUser(user)
}

async function googleLogin(userCred) {
    const user = await httpService.post('auth/login', userCred);
    console.log(user);
    if (!user) signup(userCred);
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    if (!user)
        // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
        return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.emit(SOCKET_EMIT_LOGOUT);
    return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}
