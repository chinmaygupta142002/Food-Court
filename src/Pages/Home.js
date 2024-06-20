import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Slide from '../Components/Slide';
import Card from '../Components/Card';

function Home() {
  const [menuItems, setMenuItems] = useState([]);
  
  useEffect(() => {
    fetch("/fooditems.json")
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
      })
      .catch(error => {
        console.error('Error fetching the menu items:', error);
      });
  }, []);

  return (
    <div data-theme="synthwave" className="min-h-screen bg-gray-100">
      <Navbar />
      <Slide />
      <div className='text-center text-4xl font-bold mt-10'>
      <h1>Specials</h1>
      </div>
      <div data-theme="synthwave" className="container mx-auto px-4 py-8">
        <div className="ml-10 grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
