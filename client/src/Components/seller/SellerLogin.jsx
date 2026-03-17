import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const SellerLogin = () => {

const { isSeller, setIsSeller, navigate, axios } = useAppContext()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const onSubmitHandler = async (event) => {

event.preventDefault()

try {

const { data } = await axios.post(
"/api/seller/login",
{ email, password },
{ withCredentials: true }
)

if (data.success) {

/* 🔑 TOKEN SAVE KARO */
//localStorage.setItem("sellerToken", data.token)

setIsSeller(true)

toast.success("Login Successful")

navigate("/seller")

} else {

toast.error(data.message)

}

} catch (error) {

toast.error(error.message)

}

}

useEffect(() => {

if (isSeller) {

navigate("/seller")

}

}, [isSeller])

return (

!isSeller && (

<form
onSubmit={onSubmitHandler}
className='min-h-screen flex items-center text-sm text-grey-600'
>

<div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>

<p className='text-2xl font-medium m-auto'>
<span className='text-primary'>Seller </span>Login
</p>

<div className='w-full'>
<p>Email</p>

<input
type="email"
placeholder='enter your email'
value={email}
onChange={(e)=>setEmail(e.target.value)}
className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
required
/>

</div>

<div className='w-full'>

<p>Password</p>

<input
type="password"
placeholder='enter your password'
value={password}
onChange={(e)=>setPassword(e.target.value)}
className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
required
/>

</div>

<button className="bg-[var(--color-primary)] text-white w-full px-4 py-2 rounded-md cursor-pointer">

Login

</button>

</div>

</form>

)

)

}

export default SellerLogin