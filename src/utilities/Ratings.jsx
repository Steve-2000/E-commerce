import React, { useState } from 'react'

const Ratings = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);
  
  // Extract the current minimum rating (e.g., 3 from [3, 5])
  // Default to 0 if rating is undefined
  const currentRating = rating ? rating[0] : 0;

  return (
    <div className="star-rating-filter">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => {
            // Toggle: if clicking the active star, reset to 0. Otherwise set to star.
            const newRating = currentRating === star ? 0 : star;
            setRating([newRating, 5]); 
          }}
        >
          <i
            className="fa fa-star"
            style={{ 
              color: (hover > 0 ? star <= hover : star <= currentRating) ? "orange" : "lightgrey" 
            }}
          ></i>
        </span>
      ))}
    </div>
  )
}

export default Ratings