import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory.js'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage.js'
import DisplayImage from './DisplayImage.js'
import { MdDelete } from "react-icons/md";
import SummaryApi from '../comman/index.js'
import { toast } from 'react-toastify'

const AdminEditProduct = ({ onClose, productData, fetchdata}) => {

    const [data, setData] = useState({
        ...productData,
        productname: productData?.productname,
        brand: productData?.brand,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice,


    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })


    }
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)
        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })
        // console.log("upload image", uploadImageCloudinary.url)

    }
    const handleDeleteProductImage = async (index) => {
        console.log('index image', index)
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })

    }

    /* ----------- update Product----------------- */

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        // console.log('dataproduct', responseData)
        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchdata()

        } if (responseData.error) {
            toast.error(responseData?.message)
        }

        // console.log("data", data)


    }

    return (
        <div className='fixed w-full  h-full  bg-opacity-35 bg-slate-200 right-0 bottom-0 top-0 left-0 flex justify-center items-center'>
            <div className='bg-white  p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className="font-bold">Edit product....</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className=' grid p-4 gap-2 overflow-y-scroll h-full pb-4'>
                    <label htmlFor="productname" className=''>Edit  Product Name :</label>
                    <input
                        type='text'
                        id="productname"
                        placeholder="enter prodct name"
                        name="productname"
                        value={data?.productname}
                        onChange={handleOnChange}
                        className='border rounded p-2 bg-slate-100 '
                        required
                    />
                    <label htmlFor='brand' className=''>Brand Name</label>
                    <input
                        type="text"
                        id='brand'
                        name="brand"
                        value={data?.brand}
                        onChange={handleOnChange}
                        placeholder="enter brand name"
                        className='border rounded p-2 bg-slate-100'
                        required
                    />


                    <label htmlFor="category" className='mt-2'>  Category: </label>
                    <select value={data?.category} name="category" onChange={handleOnChange} className='border rounded p-2 bg-slate-100 '>
                        <option value={""} >Select Category</option>

                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor="productImage" className='mt-2'>  Product Image:</label>
                    <div className='border rounded p-2 bg-slate-100 h-32 w-full flex justify-center items-center cursor-pointer'>
                        <label htmlFor="uploadImageInput">
                            <div className="text-slate-500 flex justify-center items-center flex-col gap-2 ">
                                <span className='text-4xl'>  <FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                            </div>
                            <input type="file" id='uploadImageInput' name="productImage"  onChange={handleUploadProduct} ></input>
                        </label>
                    </div>

                    <div >

                        {
                            data?.productImage[0] ? (
                                <div className="flex items-center gap-2   ">
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img
                                                        src={el}
                                                        alt={el}
                                                        width={80}
                                                        height={80}
                                                        className="bg-slate-100 border cursor-pointer"
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)
                                                        }}
                                                    />
                                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                            ) : (
                                <p className="text-red-4">*Pleage Upload Product  Image</p>
                            )
                        }
                    </div>

                    <label htmlFor="price" className=''>Price :</label>
                    <input
                        type='number'
                        id="price"
                        placeholder="enter prodct price"
                        name="price"
                        value={data?.price}
                        onChange={handleOnChange}
                        className='border rounded p-2 bg-slate-100 '
                        required

                    />

                    <label htmlFor=" sellingPrice" className=''> Selling Price :</label>
                    <input
                        type='number'
                        id=" sellingPrice"
                        placeholder="enter prodct sellingPrice"
                        name="sellingPrice"
                        value={data?.sellingPrice}
                        onChange={handleOnChange}
                        className='border rounded p-2 bg-slate-100 '
                        required
                    />

                    <label htmlFor="description" className=''>  Description :</label>
                    <textarea
                        className='h-28  bg-slate-100 border resize-none p-2 '
                        placeholder='enter product description'
                        row={3}
                        name="description"
                        value={data?.description}
                        onChange={handleOnChange}
                        required
                    />



                    <button className="bg-red-400 text-white px-2 py-1 hover:bg-red-700 mb-10">Update Product</button>
                </form>
            </div >

            {/*  Display Image full screen */}
            {
                openFullScreenImage && (

                    <DisplayImage onClose={() => setOpenFullScreenImage()} imgUrl={fullScreenImage} />
                )
            }
        </div >
    )
}
export default AdminEditProduct;