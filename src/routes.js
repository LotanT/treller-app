import { HomePage } from './pages/HomePage.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx';
import { LoginSignup } from './pages/LoginPage.jsx'
import { UserBoards } from './pages/UserBoards.jsx'

const routes = [
    {
        path: '/:boardId/:taskId',
        component: BoardDetails,
        label: 'BoardDetails',
    },
    {
        path: '/loginPage',
        component: LoginSignup,
        label: 'Home',
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