import React, { useState, useEffect } from 'react'
import UploadProducts from '../componets/UploadProducts.js'
import SummaryApi from '../comman/index.js'
import AdminProductCard from '../componets/AdminProductCard.js'

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allproduct, setAllProduct] = useState([])

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()
        // console.log("my name data image",dataResponse)
        setAllProduct(dataResponse?.data || [])

    }

    useEffect(() => {
        fetchAllProduct()
    }, [])
    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between align-center'>
                <h2 className='font-bold text-lg'>All Products</h2>

                <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all px-3 py-1 rounded-full' onClick={() => setOpenUploadProduct(true)}>Update  Product</button>
            </div>


            { /*---------all  product*---------*/}
            <div className='flex items-center py-4 gap-4'>
                {
                    allproduct.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
                           
                        )

                    })
                }
            </div>



            {/*  upload products component */}
            {
                openUploadProduct && (

                    <UploadProducts onClose={() => setOpenUploadProduct(false)} fetchdata={fetchAllProduct} />
                )
            }


        </div>

    )
}
export default AllProducts