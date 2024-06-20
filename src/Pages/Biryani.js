import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useCart } from '../CartContext'; // Import useCart hook

function Biryani() {
  const { addToCart } = useCart(); // Use addToCart function from CartContext
  const [biryani, setBiryani] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:5000/fetchBiryani").then(result => {
      setBiryani(result.data);
    });
  }, []);

  return (
    <div data-theme="synthwave" className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {biryani.map((item, index) => (
            <BiryaniCard key={index} item={item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BiryaniCard({ item, addToCart }) {
  const [selectedSize, setSelectedSize] = useState('half');
  const [price, setPrice] = useState(item.options[0][selectedSize]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setPrice(item.options[0][size]);
  };

  const handleAddToCart = () => {
    addToCart({
      ...item,
      size: selectedSize,
      price: item.options[0][selectedSize],
    }, 1);
    alert('Item added to cart!');
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl hover:scale-110 ease-out duration-200">
      <figure className="h-48 overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div className="card-actions justify-end">
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1">
              Size: {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a onClick={() => handleSizeChange('half')}>Half - {item.options[0].half}</a></li>
              <li><a onClick={() => handleSizeChange('full')}>Full - {item.options[0].full}</a></li>
            </ul>
          </div>
        </div>
        <div className="card-actions justify-end">
          <button onClick={handleAddToCart} className="btn btn-primary mt-10">Add to Cart - {price}</button>
        </div>
      </div>
    </div>
  );
}

export default Biryani;


