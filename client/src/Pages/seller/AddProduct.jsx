import React, { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../Context/AppContext.jsx";
import toast from "react-hot-toast";

const AddProduct = () => {

const [files, setFiles] = useState([]);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("Fruits");
const [price, setPrice] = useState("");
const [offerPrice, setOfferPrice] = useState("");

const { axios } = useAppContext();

const onSubmitHandler = async (event) => {

event.preventDefault();

try {
    const formData = new FormData();

const productData = {
  name,
  description,
  category,
  price,
  offerPrice
};

formData.append("productData", JSON.stringify(productData));


if(files[0]) formData.append("image1", files[0]);
if(files[1]) formData.append("image2", files[1]);
if(files[2]) formData.append("image3", files[2]);
if(files[3]) formData.append("image4", files[3]);

const { data } = await axios.post("/api/product/add", formData,{withCredentials: true}
  
);

if (data.success) {

toast.success(data.message);

setName("");
setDescription("");
setCategory("Fruits");
setPrice("");
setOfferPrice("");
setFiles([]);

} else {
toast.error(data.message);
}

} catch (error) {
toast.error(error.message);
}

};

return (
<div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">

<form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">

<div>
<p className="text-base font-medium">Product Image</p>

<div className="flex flex-wrap items-center gap-3 mt-2">

{Array(4).fill("").map((_, index) => (

<label key={index} htmlFor={`image${index}`}>

<input
type="file"
accept="image/*"
id={`image${index}`}
hidden
onChange={(e) => {

const updatedFiles = [...files];
updatedFiles[index] = e.target.files[0];
setFiles(updatedFiles);

}}
/>

<img
className="max-w-24 cursor-pointer"
src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
alt="upload"
width={100}
height={100}
/>

</label>

))}

</div>
</div>

<div className="flex flex-col gap-1 max-w-md">

<label className="text-base font-medium">Product Name</label>

<input
type="text"
placeholder="Type here"
value={name}
onChange={(e) => setName(e.target.value)}
className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
required
/>

</div>

<div className="flex flex-col gap-1 max-w-md">

<label className="text-base font-medium">Product Description</label>

<textarea
rows={4}
value={description}
onChange={(e) => setDescription(e.target.value)}
className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
placeholder="Type here"
/>

</div>

<div className="w-full flex flex-col gap-1">

<label className="text-base font-medium">Category</label>

<select
value={category}
onChange={(e) => setCategory(e.target.value)}
className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
>

{categories.map((item, index) => (
<option key={index} value={item.path}>
{item.path}
</option>
))}

</select>

</div>

<div className="flex items-center gap-5 flex-wrap">

<div className="flex-1 flex flex-col gap-1 w-32">

<label className="text-base font-medium">Product Price</label>

<input
type="number"
placeholder="0"
value={price}
onChange={(e) => setPrice(e.target.value)}
className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
required
/>

</div>

<div className="flex-1 flex flex-col gap-1 w-32">

<label className="text-base font-medium">Offer Price</label>

<input
type="number"
placeholder="0"
value={offerPrice}
onChange={(e) => setOfferPrice(e.target.value)}
className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
required
/>

</div>

</div>

<button className="bg-[var(--color-primary)] text-white w-full px-4 py-2 rounded-md cursor-pointer">
ADD
</button>

</form>
</div>
);
};

export default AddProduct;