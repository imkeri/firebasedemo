import React, { useContext, useEffect, useState } from 'react'
import { FireBaseContext } from '../context/Firebase'
import { useParams } from 'react-router-dom';

const AddData = () => {

    const useFireBase = useContext(FireBaseContext);
    const param = useParams()

    const [data, setData] = useState({
        p_name: "",
        p_categary: "",
        p_quantity: "",
        p_price: "",
        status: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        if (name === "status") {
            if (value == 1) {
                setData({ ...data, [name]: true })
            }
            else {
                setData({ ...data, [name]: false })
            }
        }
        else
       {
        setData({ ...data, [name]: value })
       }
    }

    const productUpdateData = async (e) => {
        e.preventDefault()
        try {
            await useFireBase.UpadateData(param.id, data)
            window.location = "/"
        } catch (error) {
            console.log("error::", error)
        }

    }


    const getProductData = async () => {
        try {
            const res = await useFireBase.getByID(param.id)
            console.log("res.data()", res.data())
            setData(res.data())
        } catch (error) {
            console.log("error::::", error)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    return (
        <div className='w-[100%]'>
            <form className='lg:w-[30%] md:w-[50%] w-[70%] mx-auto bg-gray-200  p-10 my-40 rounded' >
                <h1 className='text-[24px]'>Update PRODUCT</h1>
                <div className='flex flex-col'>
                    <label className='text-start'>product</label>
                    <input type='text' name="p_name" onChange={handleInput} value={data?.p_name} className='border px-2 py-1 my-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label className='text-start'>Categary</label>
                    <input type='text' name="p_categary" onChange={handleInput} value={data?.p_categary} className='border px-2 py-1 my-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label className='text-start'>quantity</label>
                    <input type='text' name="p_quantity" onChange={handleInput} value={data?.p_quantity} className='border px-2 py-1 my-1 rounded' />
                </div>
                <div className='flex flex-col'>
                    <label className='text-start'>price</label>
                    <input type='text' name="p_price" onChange={handleInput} value={data?.p_price} className='border px-2 py-1 my-1 rounded' />
                </div>
                <div className='flex gap-6 py-2'>
                    <div className='flex gap-2'>
                        <input type='radio' name='status' value="1" onChange={handleInput}></input>
                        <p>Active</p>
                    </div>
                    <div className='flex gap-2'>
                        <input type='radio' name='status' value="0" onChange={handleInput}></input>
                        <p>UnActive</p>
                    </div>
                </div>
                <button className='bg-black text-white px-8 py-1 rounded my-4' onClick={productUpdateData}>Add</button>
            </form>
        </div>
    )
}

export default AddData