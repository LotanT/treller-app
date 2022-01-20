import { HomePage } from './pages/HomePage.jsx'
import { BoardDetails } from './pages/BoardDetails.jsx';


const routes = [
    {
        path: '/',
        component: HomePage,
        label: 'Home',
    },
    {
        path: '/:boardId',
        component: BoardDetails,
        label: 'Home',
    },
    // {
    //     path: '/:boardId/:taskId',
    //     component: TaskEdit,
    //     label: 'edit'
    // }
]

export default routes;