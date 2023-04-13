import React, { useContext, useEffect, useState } from 'react';
import { FireBaseContext } from '../context/Firebase'
import { Link } from 'react-router-dom';

const DemoTable = () => {

    const useFirebase = useContext(FireBaseContext)
    const [data, setData] = useState("");

    const getProductData = async () => {
        try {
            const res = await useFirebase.getData()
            const data = res.docs.map((value) => ({ ...value.data(), id: value.id, }));
            setData(data)
        } catch (error) {
            console.log("error::::", error)
        }
       
    }

    useEffect(() => {
        getProductData()
    }, [])


    const productDelete =async(id)=>{
        await useFirebase.DeteleData(id);
        getProductData()
    }


    return (
        <div>
            <h1 className='text-center text-[24px] my-5'>Product Data</h1>
            <table className=" w-[40%] mx-auto border-collapse border border-slate-400">
                <thead>
                    <tr>
                        <th className='border border-slate-300'>id</th>
                        <th className='border border-slate-300'>product</th>
                        <th className='border border-slate-300'>categary</th>
                        <th className='border border-slate-300'>quantity</th>
                        <th className='border border-slate-300'>price</th>
                        <th className='border border-slate-300'>Status</th>
                        <th className='border border-slate-300'>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((value, index) => {
                            return (
                                <tr className=''>
                                    <td className='border border-slate-300 py-1'>{index + 1}</td>
                                    <td className='border border-slate-300 py-1'>{value?.p_name}</td>
                                    <td className='border border-slate-300 py-1'>{value?.p_categary}</td>
                                    <td className='border border-slate-300 py-1'>{value?.p_quantity}</td>
                                    <td className='border border-slate-300 py-1'>{value?.p_price}</td>
                                    <td className='border border-slate-300 py-1'>{value?.status ? <button className='bg-green-700 text-white px-3 rounded'>Active</button> : <button className='bg-red-700 text-white px-3 rounded'>UnActive</button>}</td>
                                    <td className='border border-slate-300 py-1'>
                                        <button onClick={()=>productDelete(value.id)} className='underline'>Delete</button>
                                        <Link to={`/upadte/${value.id}`} className='underline px-4 '>Update</Link>

                                    </td>
                                    
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default DemoTable