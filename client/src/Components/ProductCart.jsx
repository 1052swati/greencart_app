// import React from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../Context/AppContext.jsx";


// const ProductCart = ({product}) => {
    
//     const {currency, addToCart, removeFromCart, cartItems, navigate} = useAppContext()

   

//     return product &&(
//         <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
//             <div className="group cursor-pointer flex items-center justify-center px-2">
//                 <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
//             </div>

//             <div className="text-gray-500/60 text-sm">
//                 <p>{product.category}</p>
//                 <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
//                 <div className="flex items-center gap-0.5">
//                     {Array(5).fill('').map((_, i) => (
                        
//                             <img key={i} className="md:w-3.5 w3" src= {i < 4 ? assets.star_icon : assets.star_dull_icon} alt=""/>        
                        
//                     ))}
//                     <p>(4)</p>
//                 </div>

//                 <div className="flex items-end justify-between mt-3">
//                     <p className="md:text-xl text-base font-medium text-primary">
//                         {currency} {product.offerPrice}  {" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}${product.price}</span>
//                     </p>

//                     <div onClick={(e) =>{e.stopPropagation();}} className="text-primary">
//                         {!cartItems[product._id] ? (
//                             <button className="flex items-center justify-center gap-1 bg-[var(--color-primary)] text-white border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer" onClick={() => addToCart(product._id)} >
//                                <img src={assets.cart_icon} alt="cart_icon" className="w-4" />
//                                 Add
//                             </button>
//                         ) : (
//                             <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
//                                 <button onClick={() => {removeFromCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
//                                     -
//                                 </button>
//                                 <span className="w-5 text-center">{cartItems[product._id]}</span>
//                                 <button onClick={() => {addToCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
//                                     +
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCart;

import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext.jsx";

const ProductCart = ({ product }) => {

  const {
    currency,
    addToCart,
    removeFromCart,
    cartItems,
    navigate
  } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-200 rounded-xl p-3 bg-white w-full shadow-sm hover:shadow-md transition"
      >

        {/* Product Image */}
        <div className="group cursor-pointer flex items-center justify-center">
          <img
            className="w-full h-32 object-contain group-hover:scale-105 transition duration-300"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Product Details */}
        <div className="mt-3 text-gray-500/70 text-sm">

          <p>{product.category}</p>

          <p className="text-gray-800 font-semibold text-lg truncate">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                className="w-3 md:w-3.5"
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="star"
              />
            ))}

            <p>(4)</p>
          </div>

          {/* Price + Button */}
          <div className="mt-4 flex flex-col gap-3">

            {/* Price */}
            <p className="text-lg md:text-xl font-semibold text-primary">
              {currency} {product.offerPrice}

              <span className="text-gray-400 text-sm line-through ml-2">
                {currency} {product.price}
              </span>
            </p>

            {/* Add To Cart */}
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >

              {!cartItems[product._id] ? (

                <button
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white h-[40px] rounded-lg cursor-pointer hover:opacity-90 transition"
                  onClick={() => addToCart(product._id)}
                >
                  <img
                    src={assets.cart_icon}
                    alt="cart_icon"
                    className="w-4"
                  />

                  Add
                </button>

              ) : (

                <div className="flex items-center justify-between px-3 w-full h-[40px] bg-primary/15 rounded-lg select-none">

                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer text-lg font-medium px-2"
                  >
                    -
                  </button>

                  <span className="text-center font-medium">
                    {cartItems[product._id]}
                  </span>

                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer text-lg font-medium px-2"
                  >
                    +
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>
    )
  );
};

export default ProductCart;