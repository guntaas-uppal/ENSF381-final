import React from 'react';
import { Link } from 'react-router-dom';

const HomeMainSection = ({ reviews }) => {
  // Function to generate star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Unicode for star character
    }
    return stars;
  };

  return (
    <main>
      <section class="Home-Main-Section" style={{padding:10}}>
        <h2>About Us</h2>
        <p>Welcome to Shadow Ltd.! As a collective of passionate professionals united by our 
          commitment to quality and innovation, we established our platform with the mission 
          to transform the online shopping landscape. Our pledge is deeply anchored in the meticulous 
          selection of superior products, guaranteeing that each piece featured on our site embodies 
          our relentless pursuit of excellence. Driven by an uncompromising emphasis on client contentment, 
          we are dedicated to delivering a flawless and gratifying experience for our valued customers.</p>        <Link to="/products">
          <button>Shop Now</button>
        </Link>
      </section>
      <section class="Review" style={{padding:10}}>
        <h2>Customer Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>{review.customerName}</p>
            <p>{review.reviewContent}</p>
            <p>
              Rating: {renderStars(review.stars)}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomeMainSection;
