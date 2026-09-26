import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/allReviews.css";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Replace '/api/reviews' with your actual backend API URL
        const response = await axios.get(
          "http://localhost:8000/review/getAllReview",
        );
        setReviews(response.data.data);
        console.log(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch reviews",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="allReviews">
      <div className="header-bar">
        <Link to="/" className="home-btn">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
        <h2>Customer Reviews</h2>
      </div>

      <div className="reviewContainer">
        {loading && <p className="status-msg">Loading reviews...</p>}
        {error && <p className="status-msg error">{error}</p>}

        {!loading && !error && reviews.length === 0 && (
          <p className="status-msg">No reviews available.</p>
        )}

        {!loading &&
          !error &&
          reviews.map((review) => (
            <div key={review._id || review.id} className="review-card">
              <div className="card-header">
                <div className="profile-info">
                  {review.user.profile ? (
                    <img
                      src={review.user.profile}
                      alt="profile"
                      className="profile-img"
                    />
                  ) : (
                    <div className="profile-avatar">
                      {review.name ? review.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <h4 className="profile-name">
                    {review.user.name || "Anonymous User"}
                  </h4>
                </div>
                <div className="rating-stars">
                  {renderStars(review.rating || 5)}
                </div>
                <div className="createAt">
                  <span>
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <p className="review-message">{review.message}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default AllReviews;
