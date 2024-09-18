import { createBrowserRouter } from 'react-router-dom'
import App from '../App.js'
import Home from '../pages/Home.js'
import Login from '../pages/Login.js'
import ForgotPassword from '../pages/ForgotPassword.js'
import SignUp from '../pages/SignUp.js'
import AdminPanel from '../pages/AdminPanel.js'
import AllUsers from '../pages/AllUsers.js'
import AllProducts from '../pages/AllProducts.js'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },
            {
                path: 'admin-panel',
                element: <AdminPanel />,
                children: [
                    {
                        path: 'all-users',
                        element: <AllUsers />
                    },
                    {
                        path: 'all-products',
                        element: <AllProducts />
                    },
                    {
                        path:'update-user',
                        element:<updateUser/>
                    }
                ]
            }
        ]
    },

])
export default router