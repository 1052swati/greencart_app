
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "https://greencart-app-backend-seven.vercel.app";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const [address, setAddress] = useState(
    () => JSON.parse(localStorage.getItem("shippingAddress")) || null
  );

  const [addresses, setAddresses] = useState(
    () => JSON.parse(localStorage.getItem("allAdresses")) || null
  );

  // Fetch Seller Status
  const fetchSeller = async () => {
  try {
    const { data } = await axios.get("/api/seller/is-auth");

    if (data.success) {
      setIsSeller(true);
    }

  } catch (error) {
    setIsSeller(false); // ignore 403 silently
  }
};

  // Fetch user Auth Status , User Data ans cart Items
  const fetchUser = async ()=>{
    try {
      const {data} = await axios.get('/api/user/is-Auth');
      if(data.success){
        setUser(data.user)
        setCartItems(data.user.cartItems)
      }
      
    } catch (error) {
      setUser(null)
    }
  }

  // Fetch products
  const fetchProducts = async () => {
   try {
    const { data } = await axios.get('/api/product/list')
    if(data.success){
      setProducts(data.products)
    }else{
      toast.error(data.message)
    }
    
   } catch (error) {
    toast.error(error.message)
   }
  };

  // Add to cart
  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // Update cart item
  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    setCartItems(cartData);
    toast.success("Cart updated");
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
    toast.success("Removed from cart");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (product) => product._id === itemId
      );

      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }

    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchUser()
    fetchSeller();
    fetchProducts();
  }, []);
//Update Database Cart Items
  useEffect(()=>{
      const updateCart = async ()=>{
        try {
          const { data } = await axios.post('/api/cart/update', {cartItems}) 
          if (!data.success){
            toast.error(data.message)
          }
        } catch (error) {
           toast.error(error.message)
        }
      }
      if(user){
        updateCart()
      }
  },[cartItems])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    address,
    setAddress,
    addresses,
    setAddresses,
    axios,
    fetchProducts,
    setCartItems
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);