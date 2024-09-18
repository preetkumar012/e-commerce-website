import React, { useState, useEffect } from 'react';
import SummaryApi from '../comman/index.js';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ChangeUserRole from '../componets/ChangeUserRole.js';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        name: "",
        email: "",
        role: "",
        _id: '',
        callFunc: '',
    })


    // console.log(allUsers)
    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'

        })
        const dataResponse = await fetchData.json()
        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        } if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
        console.log(dataResponse)
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <div className=' bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((ele, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.email}</td>
                                    <td>{ele.role}</td>
                                    <td>{moment(ele.createdAt).format("LLL")}</td>
                                    <td className='flex justify-evenly align-middle'>
                                        <button className=" bg-green-100 p-2    hover:bg-green-800 cursor-pointer rounded-full"
                                            onClick={() => {
                                                setUpdateUserDetails(ele)
                                                setOpenUpdateRole(true)
                                            }
                                            }

                                        ><MdModeEdit /></button>
                                        <button className="  bg-green-100 p-2   hover:bg-green-800 cursor-pointer rounded-full"><MdDelete /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                openUpdateRole && (

                    <ChangeUserRole

                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}

                    />
                )
            }
        </div>
    );
};

export default AllUsers;
