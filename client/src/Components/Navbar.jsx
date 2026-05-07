// import React, { useEffect } from 'react'
// import { NavLink } from 'react-router-dom'
// import {assets} from '../assets/assets'
// import { useAppContext } from '../Context/AppContext.jsx'
// import toast from 'react-hot-toast'

// const Navbar = () => {
//         const [open, setOpen] = React.useState(false)
//         const {user, setUser ,setCartItems,  setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios} = useAppContext();

//         const logout = async ()=>{
//             try {
//                 const { data } = await axios.get('/api/user/logout')
//                 if(data.success){
//                     toast.success(data.message)
//                      setUser(null);
//                      setCartItems({});  
//                      navigate("/")
//                 }else{
//                  toast.error(data.message)   
//                 }
//             } catch (error) {
//                 toast.error(error.message)   
//             }
           


//         }
//         useEffect(()=>{
//             if(searchQuery.length > 0){
//                 navigate("/products")
//             }

//         },[searchQuery])


//   return (
//     <nav className="flex items-center justify-between px-4 md:px-14  py-4 border-b border-gray-300 bg-white relative transition-all">

//             <NavLink to='/' onClick={()=> setOpen(false)}>
//                 <img className="h-9" src={assets.logo} alt="logo" />
                
//             </NavLink>

//             {/* Desktop Menu */}
//             <div className="hidden sm:flex items-center gap-8">
//                <NavLink to='/'>Home</NavLink>
//                 <NavLink to='/Products'>All Product</NavLink>
//                  <NavLink to='/'>Contact</NavLink>

//                 <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//                     <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
//                    <img src={assets.search_icon} alt='search' className='w-4 h-4'/>
//                 </div>

//                 <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
//                     <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
//                     <button className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
//                 </div>

//                {!user ? (<button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-[var(--color-primary)] hover:bg-primary-dull transition text-white rounded-full">
//                     Login
//                 </button>):(
//                     <div className='relative group'>
//                         <img src={assets.profile_icon} className='w-10' alt="" />
//                         <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
//                             <li onClick={()=> navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
//                             <li onClick={logout} className='p-1.5 pl-3 bg-[var(--color-primary)] cursor-pointer'>Logout</li>
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             <div className='flex items-center gap-6 sm:hidden'>
//                 <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
//                     <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
//                     <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
//                 </div>


//                 <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
//                 {/* Menu Icon SVG */}
//               <img src={assets.menu_icon} alt="menu"  />
//             </button>
//             </div>

            

//              {/* { open && (
//             <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
//                 <NavLink to="/" onClick={()=> setOpen(false)}>Home</NavLink>
//                 <NavLink to="/products" onClick={()=> setOpen(false)}>All Product</NavLink>
//                 {user &&
//                 <NavLink to="/products" onClick={()=> setOpen(false)}>My Orders</NavLink>
//                 }
//                 <NavLink to="/" onClick={()=> setOpen(false)}>Contact</NavLink>



//                {!user ? (

               
//                 <button onClick={()=>{
//                     setOpen(false);
//                     setShowUserLogin(true);
//                 }}className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
//                     Login
//                 </button>
//                ) :(
//                  <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
//                     Logout
//                 </button>
//                )}
//             </div>
// )} */}
// {open && (
//   <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden z-50">
    
//     <NavLink to="/" onClick={()=> setOpen(false)}>Home</NavLink>
//     <NavLink to="/products" onClick={()=> setOpen(false)}>All Product</NavLink>

//     {user && (
//       <NavLink to="/orders" onClick={()=> setOpen(false)}>My Orders</NavLink>
//     )}

//     <NavLink to="/" onClick={()=> setOpen(false)}>Contact</NavLink>

//     {!user ? (
//       <button
//         onClick={()=>{
//           setOpen(false);
//           setShowUserLogin(true);
//         }}
//         className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
//       >
//         Login
//       </button>
//     ) : (
//       <button
//         onClick={logout}
//         className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
//       >
//         Logout
//       </button>
//     )}
//   </div>
// )}
 

//         </nav>
   
//   )
// }

// export default Navbar

import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext.jsx'
import toast from 'react-hot-toast'

const Navbar = () => {

    const [open, setOpen] = React.useState(false)

    const {
        user,
        setUser,
        setCartItems,
        setShowUserLogin,
        navigate,
        setSearchQuery,
        searchQuery,
        getCartCount,
        axios
    } = useAppContext();

    // Logout Function
    const logout = async () => {

        try {

            const { data } = await axios.get('/api/user/logout')

            if (data.success) {

                toast.success(data.message)

                setUser(null)
                setCartItems({})

                navigate("/")

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Search Redirect
    useEffect(() => {

        if (searchQuery.length > 0) {
            navigate("/products")
        }

    }, [searchQuery])

    return (

        <nav className="flex items-center justify-between px-4 md:px-14 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">

            {/* Logo */}
            <NavLink to='/' onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* ================= Desktop Menu ================= */}

            <div className="hidden md:flex items-center gap-8">

                <NavLink to='/'>
                    Home
                </NavLink>

                <NavLink to='/products'>
                    All Products
                </NavLink>

                <NavLink to='/'>
                    Contact
                </NavLink>

                {/* Search */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">

                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />

                    <img
                        src={assets.search_icon}
                        alt='search'
                        className='w-4 h-4'
                    />

                </div>

                {/* Cart */}
                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer"
                >

                    <img
                        src={assets.nav_cart_icon}
                        alt="cart"
                        className='w-6 opacity-80'
                    />

                    <button className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>

                </div>

                {/* Login / Profile */}
                {!user ? (

                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-[var(--color-primary)] hover:opacity-90 transition text-white rounded-full"
                    >
                        Login
                    </button>

                ) : (

                    <div className='relative group'>

                        <img
                            src={assets.profile_icon}
                            className='w-10 cursor-pointer'
                            alt="profile"
                        />

                        <ul className='hidden group-hover:block absolute top-12 right-0 bg-white shadow-lg border border-gray-200 py-2 w-36 rounded-md text-sm z-40'>

                            <li
                                onClick={() => navigate("/my-orders")}
                                className='p-2 pl-4 hover:bg-primary/10 cursor-pointer'
                            >
                                My Orders
                            </li>

                            <li
                                onClick={logout}
                                className='p-2 pl-4 hover:bg-red-100 cursor-pointer text-red-500'
                            >
                                Logout
                            </li>

                        </ul>

                    </div>

                )}

            </div>

            {/* ================= Mobile Menu ================= */}

            <div className='flex items-center gap-4 md:hidden'>

                {/* Cart */}
                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer"
                >

                    <img
                        src={assets.nav_cart_icon}
                        alt="cart"
                        className='w-6 opacity-80'
                    />

                    <button className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>

                </div>

                {/* Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                >

                    <img
                        src={assets.menu_icon}
                        alt="menu"
                        className='w-6'
                    />

                </button>

            </div>

            {/* ================= Mobile Dropdown ================= */}

            {open && (

                <div className="absolute top-full left-0 w-full bg-white shadow-lg py-5 flex flex-col items-start gap-4 px-5 text-sm md:hidden z-50 border-t border-gray-200">

                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        onClick={() => setOpen(false)}
                    >
                        All Products
                    </NavLink>

                    {user && (

                        <NavLink
                            to="/my-orders"
                            onClick={() => setOpen(false)}
                        >
                            My Orders
                        </NavLink>

                    )}

                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                    >
                        Contact
                    </NavLink>

                    {/* Mobile Search */}
                    <div className="flex items-center w-full border border-gray-300 rounded-full px-3">

                        <input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="py-2 w-full bg-transparent outline-none placeholder-gray-500"
                            type="text"
                            placeholder="Search products"
                        />

                        <img
                            src={assets.search_icon}
                            alt='search'
                            className='w-4 h-4'
                        />

                    </div>

                    {/* Login / Logout */}
                    {!user ? (

                        <button
                            onClick={() => {
                                setOpen(false)
                                setShowUserLogin(true)
                            }}
                            className="cursor-pointer w-full py-2 bg-[var(--color-primary)] hover:opacity-90 transition text-white rounded-lg text-sm"
                        >
                            Login
                        </button>

                    ) : (

                        <button
                            onClick={logout}
                            className="cursor-pointer w-full py-2 bg-red-500 hover:opacity-90 transition text-white rounded-lg text-sm"
                        >
                            Logout
                        </button>

                    )}

                </div>

            )}

        </nav>
    )
}

export default Navbar