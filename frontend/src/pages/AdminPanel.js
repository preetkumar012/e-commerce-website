import React, { useEffect } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ROLE from '../comman/role.js'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()
    useEffect(() => {

        if (user?.role !== ROLE.ADMIN) {
            navigate('/'); // Redirect to home page if the user is not an admin
        }
    }, [user, navigate]);



    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden scroll-m-0'>
            <aside className='bg-white min-h-full  w-full max-w-60 customShadow  '>
                <div className='h-30 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer flex justify-center relative' >
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className='w-20,h-20 rounded-full' alt={user?.name}></img>
                            ) : (

                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                { /*  navigation */}

                <div>
                    <nav className="grid p-4">
                        <Link to={"all-users"} className=" px-2 py-1"> All users</Link>
                        <Link to={"all-products"} className="px-2 py-1">All Products</Link>
                    </nav>
                </div>
            </aside>
            <main className='w-full h-full p-2'>
                <Outlet />
            </main>
        </div>
    )
}
export default AdminPanel