import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useCart } from '../CartContext'; // Import useCart hook

function Starters() {
  const { addToCart } = useCart(); // Use addToCart function from CartContext
  const [starters, setStarters] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:5000/fetchStarters").then(result => {
      setStarters(result.data);
    });
  }, []);

  return (
    <div data-theme="synthwave" className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {starters.map((item, index) => (
            <StarterCard key={index} item={item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StarterCard({ item, addToCart }) {
  // Assuming starters may have different options or categories
  // For simplicity, let's say starters have different sizes/options
  const [selectedOption, setSelectedOption] = useState(item.options ? Object.keys(item.options[0])[0] : null);
  const [price, setPrice] = useState(item.options ? item.options[0][selectedOption] : null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setPrice(item.options[0][option]);
  };

  const handleAddToCart = () => {
    addToCart({
      ...item,
      option: selectedOption,
      price: item.options[0][selectedOption],
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
        {item.categories && (
          <div className="card-actions justify-end">
            {item.categories.map((category, idx) => (
              <div key={idx} className="badge badge-outline mr-2">{category}</div>
            ))}
          </div>
        )}
        {item.options && (
          <div className="card-actions justify-end">
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                Option: {selectedOption}
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {Object.keys(item.options[0]).map((option, idx) => (
                  <li key={idx}><a onClick={() => handleOptionChange(option)}>{option} - {item.options[0][option]}</a></li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="card-actions justify-end">
          <button onClick={handleAddToCart} className="btn btn-primary mt-10">Add to Cart - {price}</button>
        </div>
      </div>
    </div>
  );
}

export default Starters;

