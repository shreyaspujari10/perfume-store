// src/pages/Product.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));

    axios.get(`http://localhost:5000/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <div className="gallery">
        {product.images && product.images.map((img, index) => (
          <img key={index} src={img} alt={product.name} />
        ))}
      </div>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div className="sizes">
        {product.sizes && product.sizes.map((size, index) => (
          <span key={index}>{size}</span>
        ))}
      </div>
      <div className="reviews">
        <h2>Reviews</h2>
        {reviews.map(review => (
          <div key={review._id} className="review">
            <p><strong>{review.user}</strong>: {review.review} ({review.rating}/5)</p>
          </div>
        ))}
      </div>
      <button className="share-btn">Share on Social Media</button>
    </div>
  );
};

export default Product;
