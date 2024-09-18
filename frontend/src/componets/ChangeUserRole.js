import React, { useState } from 'react'
import ROLE from '../comman/role.js'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../comman/index.js'
import { toast } from 'react-toastify'

const ChangeUserRole = ({
    name,
    email,
    userId,
    role,
    onClose,
    callFunc,
}) => {

    const [userRole, setUserRole] = useState(role)
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
        console.log(e.target.value)
    }
    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })

        })

        const responseData = await fetchResponse.json()

        if (responseData.success) {
            toast.success(responseData.message)
            onClose()
            callFunc()

        }

        // console.log("role updated", responseData)
    }
    return (
        <div className=' fixed bottom-0 top-0 left-0 right-0 z-10 w-full h-full flex justify-between items-center bg-slate-200 bg-opacity-50'>
            <div className='bg-white shadow-md p-4 w-full max-w-sm  mx-auto '>
                <button className=' block ml-auto' onClick={onClose}><IoMdClose /></button>


                <h1 className='pb-2 text-lg text-center font-medium'>Change User Role</h1>
                <p>Name  : {name} </p>
                <p>Email : {email} </p>
                <div className='flex justify-between items-center py-1'>
                    <p>Role:{role}</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (

                                    <option value={el} key={el}>
                                        {el}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className='block mx-auto w-fit bg-red-500 rounded-full py-1 px-3 border text-white hover:bg-red-700' onClick={updateUserRole}>
                    Change Role
                </button>

            </div>

        </div>
    )
}
export default ChangeUserRole;