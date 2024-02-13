import GradePage from "../pages/GradePage"
import HomePage from "../pages/HomePage"

export const IndexModel = [
    {
        id: 1,
        routerName: 'HomePage',
        routerPath: '/',
        routerComponent: <HomePage/>,
    },
    {
        id: 2,
        routerName: 'GradePage',
        routerPath: '/grade',
        routerComponent: <GradePage/>,
    }
]