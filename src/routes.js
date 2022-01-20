import { HomePage } from './pages/HomePage.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx';
import { TaskEdit } from './cmps/task-edit/TaskEdit.jsx';
import {UserBoards} from './pages/UserBoards.jsx'

const routes = [
    {
        path: '/:boardId/:groupId/:taskId',
        component: TaskEdit,
        label: 'edit'
    },
    {
        path: '/userboards',
        component: UserBoards,
        label: 'UserBoards',
    },
    {
        path: '/:boardId',
        component: BoardDetails,
        label: 'BoardDetails',
    },
    {
        path: '/',
        component: HomePage,
        label: 'Home',
    },
]

export default routes;