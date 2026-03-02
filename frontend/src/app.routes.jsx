import {createBrowserRouter} from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import Protected from "./features/auth/components/Protected"
import Home from "./features/interview/pages/Home"


export const routes = createBrowserRouter([
        {
                path:'/register',
                element: <Register />
        },
        {
                path:'/login',
                element: <Login />
        },
        {
                path:'/',
                element:<Protected>
                        <Home />
                </Protected>
        }
])