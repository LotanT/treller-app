import { HomePage } from './pages/HomePage.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx';
import { TaskEdit } from './cmps/task-edit/TaskEdit.jsx';
import {UserBoards} from './pages/UserBoards.jsx'

const routes = [
    // {
    //     path: '/:boardId/:groupId/:taskId',
    //     component: TaskEdit,
    //     label: 'TaskEdit'
    // },
    {
        path: '/:boardId/:taskId',
        component: BoardDetails,
        label: 'BoardDetails',
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

    // {
    //     path: '/:boardId/:taskId',
    //     component: TaskEdit,
    //     label: 'edit'
    // }
]

export default routes;