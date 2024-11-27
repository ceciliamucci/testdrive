import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [ratings, setRatings] = useState([0, 0]); // State to hold ratings for each doctor
  const [showReviewForm, setShowReviewForm] = useState(false); // State to control the visibility of the review form
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 }); // State for form data

  const handleRating = (index, rating) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  const handleReviewButtonClick = () => {
    setShowReviewForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctorIndex = formData.rating === 1 ? 0 : 1; // Assuming the first doctor is rated with 1 star
    handleRating(doctorIndex, formData.rating);
    setShowReviewForm(false); // Hide the review form after submission
    setFormData({ name: '', review: '', rating: 0 }); // Reset form data
  };

  return (
    <div className="review-form">
      <h2>Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Dr. John Doe', specialty: 'Cardiology' },
            { name: 'Dr. Jane Smith', specialty: 'Dermatology' },
          ].map((doctor, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>
                <button className="feedback-link" onClick={handleReviewButtonClick}>Leave Review</button>
              </td>
              <td>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${ratings[index] >= star ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Overlay for the review form */}
      {showReviewForm && <div className="overlay" onClick={() => setShowReviewForm(false)}></div>}

      {/* Review Form */}
      {showReviewForm && (
        <div className="review-form-container">
          <h2>Give Your Review</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="review">Review:</label>
              <textarea id="review" name="review" value={formData.review} onChange={handleChange} required />
            </div>
            <div>
              <label>Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${formData.rating >= star ? 'filled' : ''}`}
                    onClick={() => setFormData({ ...formData, rating: star })}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;