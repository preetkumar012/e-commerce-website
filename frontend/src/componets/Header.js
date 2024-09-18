import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SummaryApi from '../comman/index.js'
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice.js'
import ROLE from '../comman/role.js'


const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()

    const [menuDisplay, setMenuDisplay] = useState(false)

    // console.log("user header", user)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'

        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }
        if (data.error) {
            toast.error(data.message)

        }

    }
    return (

        <header className='h-16 shadow-md bg-white '>
            <div className='container  mx-auto flex items-center h-full px-4 justify-between'>
                <Link to={'/login'} className=''>
                    <Logo w={100} h={50} />
                </Link>

                <div className='  hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                    <input type='search' placeholder='enter search' className='w-full outline-none ' />
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex justify-center items-center rounded-r-full text text-white'>
                        <GrSearch />
                    </div>
                </div>

                <div className='flex text-center gap-4'>
                    <div className='relative  flex justify-center' >
                        {
                            user?._id && (
                                <div className='text-3xl cursor-pointer flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                                    {
                                        user?.profilePic ? (
                                            <img src={user?.profilePic} className='w-10,h-10 rounded-full' alt={user?.name}></img>
                                        ) : (

                                            <FaRegCircleUser />
                                        )
                                    }
                                </div>
                            )
                        }




                        {
                            menuDisplay && (

                                <div className='absolute bg-white  bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(false)}>Admin Panel</Link>
                                            )
                                        }
                                    </nav>
                                </div>
                            )
                        }
                    </div>

                    <div className='text-3xl relative'>
                        <span> <FaShoppingCart /></span>
                        <div className='bg-red-600 text-white p-1 w-4 h-4 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
                            <p className='text-sm'>0</p>
                        </div>
                    </div>
                </div>

                <div >
                    {
                        user?._id ? (
                            <button onClick={handleLogout} className='px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700'>Logout</button>
                        )
                            : (
                                <Link to={'/login'} className='px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700'>Login</Link>
                            )
                    }
                </div>
            </div>
        </header>
    )
}
export default Header
