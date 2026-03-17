import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {

    const {
        products,
        currency,
        cartItems,
        removeFromCart,
        getCartCount,
        updateCartItem,
        navigate,
        getCartAmount,
        axios,
        user,
        address,
        setCartItems   // ✅ added from context
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");

    // Build cart array
    const getCart = () => {
        let tempArray = [];

        for (const key in cartItems) {
            const foundProduct = products.find(item => item._id === key);
            if (foundProduct) {
                tempArray.push({
                    ...foundProduct,
                    quantity: cartItems[key],
                });
            }
        }

        setCartArray(tempArray);
    };

    // Fetch user addresses
    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('/api/address/get');

            if (data.success) {
                setAddresses(data.addresses);

                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const placeOrder = async () => {
        try{
        if (!selectedAddress) {
          return toast.error("Please select delivery address");
            
        }
        if(paymentOption === "COD"){
            const {data} = await axios.post('/api/order/cod', {
                userID: user._id,
                items: cartArray.map(item=>({product: item._id, quantity: item.quantity })),
                address: selectedAddress._id
            })

            if(data.success){
                toast.success(data.message)
                setCartItems({})
                navigate("/my-orders")


            }else{
                toast.error(data.message)
            }
        }else{
            //place order with Stripe
             const {data} = await axios.post('/api/order/stripe', {
                userID: user._id,
                items: cartArray.map(item=>({product: item._id, quantity: item.quantity })),
                address: selectedAddress._id
            })

            if(data.success){
               window.location.replace(data.url)

            }else{
                toast.error(data.message)
            }


        }
        }catch(error){
            toast.error(error.message)
    }

       
    };

    // Update cart when products/cartItems change
    useEffect(() => {
        if (products.length > 0 && Object.keys(cartItems).length > 0) {
            getCart();
        } else {
            setCartArray([]);
        }
    }, [products, cartItems]);

    // Load address when user available
    useEffect(() => {
        if (user) {
            getUserAddress();
        }
    }, [user]);

    return products.length > 0 && Object.keys(cartItems).length > 0 ? (

        <div className="flex flex-col md:flex-row mt-16">

            {/* LEFT SIDE */}
            <div className="flex-1 max-w-4xl">

                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart
                    <span className="text-sm text-[var(--color-primary)]">
                        {" "}({getCartCount()} Items)
                    </span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (

                    <div
                        key={index}
                        className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3"
                    >

                        <div className="flex items-center gap-4">

                            <div
                                onClick={() => {
                                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                    scrollTo(0, 0);
                                }}
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
                            >
                                <img
                                    className="max-w-full h-full object-cover"
                                    src={product.image[0]}
                                    alt={product.name}
                                />
                            </div>

                            <div>
                                <p className="font-semibold">{product.name}</p>

                                <p className="text-gray-500">
                                    Qty:
                                    <select
                                        onChange={e =>
                                            updateCartItem(product._id, Number(e.target.value))
                                        }
                                        value={cartItems[product._id]}
                                        className="ml-2 outline-none"
                                    >
                                        {Array(9).fill('').map((_, i) => (
                                            <option key={i} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                            </div>

                        </div>

                        <p className="text-center">
                            {currency}{product.offerPrice * product.quantity}
                        </p>

                        <button
                            onClick={() => removeFromCart(product._id)}
                            className="cursor-pointer mx-auto"
                        >
                            <img
                                src={assets.remove_icon}
                                alt="remove"
                                className="w-6 h-6"
                            />
                        </button>

                    </div>
                ))}

            </div>

            {/* RIGHT SIDE */}
            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">

                <h2 className="text-xl font-medium">Order Summary</h2>
                <hr className="my-5" />

                <p className="text-sm font-medium uppercase">
                    Delivery Address
                </p>

                <div className="relative mt-2">

                    <p className="text-gray-500">
                        {selectedAddress
                            ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                            : "No address found"}
                    </p>

                    <button
                        onClick={() => setShowAddress(!showAddress)}
                        className="text-[var(--color-primary)]  hover:underline mt-2"
                    >
                        Change
                    </button>

                    {showAddress && (
  <div className="absolute mt-2 bg-white border w-full text-sm">

    {addresses.map((addr, index) => (
      <p
        key={index}
        onClick={() => {
          setSelectedAddress(addr);
          setShowAddress(false);
        }}
        className="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {addr.street}, {addr.city}
      </p>
    ))}

    {/* Add Address button always */}
    <p
      onClick={() => navigate("/add-address")}
      className="p-2 text-white bg-[var(--color-primary)] cursor-pointer border-t"
    >
      + Add Address
    </p>

  </div>
)}

                </div>

                <p className="text-sm font-medium uppercase mt-6">
                    Payment Method
                </p>

                <select
                    onChange={e => setPaymentOption(e.target.value)}
                    className="w-full border px-3 py-2 mt-2 outline-none"
                >
                    <option value="COD">Cash On Delivery</option>
                    <option value="Online">Online Payment</option>
                </select>

                <hr className="my-5" />

                <div className="space-y-2 text-gray-600">

                    <p className="flex justify-between">
                        <span>Price</span>
                        <span>{currency}{getCartAmount()}</span>
                    </p>

                    <p className="flex justify-between">
                        <span>Tax (2%)</span>
                        <span>{currency}{getCartAmount() * 0.02}</span>
                    </p>

                    <p className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>
                            {currency}
                            {getCartAmount() + getCartAmount() * 0.02}
                        </span>
                    </p>

                </div>

                <button
                    onClick={placeOrder}
                    className="w-full py-3 mt-6 bg-[var(--color-primary)] text-white hover:bg-primary-dull transition"
                >
                    {paymentOption === "COD"
                        ? "Place Order"
                        : "Proceed to Checkout"}
                </button>

            </div>

        </div>

    ) : null;
};

export default Cart;
