import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct'
import displayINRCurrency from '../helpers/displayCurrency.js'




const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false)
    // console.log(data)

    return (
        <div className='bg-white p-4 rounded'>
            <div className="w-44 ">
                <img src={data?.productImage[0]} width={120} height={120} alt="noimg" className="w-fit mx-auto" />
                <h1>{data?.productname}</h1>
                <div>

                    <p className="font-semibold">
                        {
                            displayINRCurrency(data.sellingPrice)
                        }

                    </p>

                    <div className=" w-fit bg-green-200 hover:bg-green-600 rounded-full ml-auto p-2 hover:text-white cursor-pointer" onClick={() => setEditProduct(true)} >
                        <MdModeEdit />
                    </div>
                </div>
            </div>
            {
                editProduct && (

                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }
        </div>
    )
}
export default AdminProductCard;
