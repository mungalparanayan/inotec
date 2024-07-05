import React, { useState } from 'react';

const feedbackStyles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  starsContainer: {
    display: 'inline-block',
  },
  star: {
    fontSize: '25px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  selectedStar: {
    color: 'orange',
  }
};

const Feedback = (props) => {
  const [rating, setRating] = useState(0);
  const [credentials, setCredentials] = useState({email: "", rating: ""})
  // const URL = "http://localhost:5000"
  const URL = "https://inotec-9.onrender.com"
  
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };
  
  const handleRating = async (e) => {
    e.preventDefault();
    credentials.email = localStorage.getItem("Email");
    setCredentials({ ...credentials, rating: rating });
    console.log("URL " + URL);
    const response = await fetch(`${URL}/api/feed/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, rating: rating })
    });
    const json = await response.json();
    console.log(json);
    setRating(0);
    if(props.showAlert && json.success) {
      props.showAlert("Rating Submitted successfully", "success");
    }
    else {
      props.showAlert("You have already submitted a rating", "warning");
    }
  }
  
  return (
    <div style={feedbackStyles.container}>
      <h1>Rate our service:</h1>
      <div style={feedbackStyles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              ...feedbackStyles.star,
              ...(star <= rating ? feedbackStyles.selectedStar : {}),
            }}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <p>Your rating: <span id="selected-rating">{rating}</span> stars</p>
      <button className="btn btn-info" onClick={handleRating}>Submit</button>
    </div>
  );
}

export default Feedback;
