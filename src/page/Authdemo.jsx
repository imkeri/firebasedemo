import React, { useContext, useEffect, useState } from 'react'
import { app } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { FireBaseContext } from '../context/Firebase'


const Authdemo = () => {
    // const auth = getAuth(app)

    const useFirebase = useContext(FireBaseContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((val) => alert("success"))
    //     .catch((error) => alert("error",error))
    // }

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     signInWithEmailAndPassword(auth, email, password)
    //     .then((val) => alert("success"))
    //     .catch((error) => alert("error",error))
    // }

  

return (
    <div className='h-[100vh]'>
        <div className='shadow-2xl bg-slate-900 lg:w-[25%] md:w-[35%] sm:w-[50%] w-[70%]  m-auto my-60 rounded-md'>
            <form
                // onSubmit={onSubmit} 

                className='w-[100%] pt-14 px-10 '>
                <div className='flex flex-col gap-2 my-1 text-white'>
                    <label className='text-start px-2'>email</label>
                    <input type='text' placeholder='enter email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} className=' border-0 border-b-2 border-white px-2 py-1 bg-transparent text-white' autoComplete='off' />
                </div>
                <div className='flex flex-col gap-2 my-1'>
                    <label className='text-start px-2 text-white'>password</label>
                    <input type='text' placeholder='enter password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} className=' border-0 border-b-2 border-[white] px-2 py-1 bg-transparent text-white' autoComplete='off' />
                </div>
                <button type='submit' className='bg-white my-2 px-10 py-1 rounded my-4 '
                    onClick={(e) => {
                        // useFirebase.signupUserWithEmailAndPassword(e, email, password);
                        useFirebase.signInUserWithEmailAndPassword(e, email, password)
                        useFirebase.putData(`/user/keri`, { email, password })
                    }}>Submit</button>

            </form>
            <div className=' py-5'>
                <button className='text-white underline' onClick={() => useFirebase.userSignInWithGoogle()}>Sign In With Google</button>
            </div>
        </div>
    </div >
)
}

export default Authdemo