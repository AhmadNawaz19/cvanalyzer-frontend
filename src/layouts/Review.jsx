import React, { useEffect, useState } from "react";
import { FaStar, FaUserCircle, FaPaperPlane } from "react-icons/fa";
import "./styles/review.css";
import { useUserStore } from "../store/userDataStore";
import { Link } from "react-router-dom";
import axios from "axios";


const Review = React.memo(() => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const { user } = useUserStore();
  const [isSuccess, setSuccess] = useState(false)


  const submiteReview = async (review)=> {
    const response = await axios.post('http://localhost:8000/review/postReview', review, {
      withCredentials: true,
    })
    if(!response.data.success) {
      setSuccess(false)
    }else{
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 1500);
    }
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    const userReview = {
      rating: rating,
      message: newReview,
    };  
    submiteReview(userReview)
    setNewReview("");
  };

  useEffect(() => {
    const fetchReview = async () => {
      const response = await  axios.get('http://localhost:8000/review/getReview')
    setReviews(response.data.data)
    }
    fetchReview()
  }, []);

  return (
    <section id="review">
      <div className="review-header">
        <h2>What Applicants Say</h2>
        <p>
          Real feedback from job seekers who optimized their resumes and landed
          interviews.
        </p>
      </div>

      {/* Logged-In User Input Form */}
      <form className="user-review-form" onSubmit={handleSubmitReview}>
        <div className="form-header">
          {user?.profile ? (
            <img src={user?.profile} alt={user?.name} className="user-avatar" />
          ) : (
            <FaUserCircle className="user-icon-placeholder" />
          )}
          <div>
            {user?.profile ? (
              <h4>{user?.name}</h4>
            ) : (
              <Link to={"/login"}>Sign Up</Link>
            )}
          </div>
        </div>

            

        {user?.profile && (
          
          <div className="rating-select">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`star-select ${star <= rating ? "selected" : ""}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        )}

        {user?.profile ? (
          <>
            <textarea
              placeholder="Share your experience with AI Resume Analyzer..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows="3"
              required
            />

            <button type="submit" className="submit-review-btn">
              <FaPaperPlane /> Placed Review
            </button>
          </>
        ) : (
          <h1 style={{color: 'blue'}}>Placed Review</h1>
        )}
      </form>


        {
          isSuccess && (
            <div className="isSucess">
              <h1>⭐ Thanks for the rating!</h1>
            </div>
          )
        } 

      {/* Testimonial Cards Grid */}
      <div id="cards">
        {reviews?.map((val) => (
          <div
            key={val.id}
            className={`reviewCard`}
          >

            <div className="card-top">
              {val.user.profile ? (
                <img src={val.user.profile} alt={val.user.name} />
              ) : (
                <FaUserCircle className="card-avatar-fallback" />
              )}
              <div className="user-details">
                <h3>{val.user.name}</h3>
              </div>
            </div>

            <div className="stars">
              {[...Array(val.rating)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>

            <p>"{val.message}"</p>
          </div>
        ))}
      </div>
      <Link to={'/reviews'}><h2 className="AllReviewBtn">View All Review</h2></Link>
    </section>
  );
});

Review.displayName = "Review";
export default Review;
