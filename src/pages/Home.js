// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';
import bannerImage from '../assets/banner-image.jpg';  // Import the image

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home">
      <div className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <h1>Explore Our Latest Collections</h1>
      </div>
      <div className="product-cards">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.images[0]} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link to={`/product/${product._id}`} className="details-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
