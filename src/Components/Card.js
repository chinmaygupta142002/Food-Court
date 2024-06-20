import React from 'react';

const Card = ({ item }) => {
  return (
    <div className="card card-compact w-96 hover:scale-110 ease-out duration-200 bg-base-100 shadow-xl">
      <figure className="h-48">
        <img src={item.location} alt="" className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.desc}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

