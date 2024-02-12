import React, { useState } from "react";




const UserReviews = ({index,review}) => {
  const [rating, setRating] = useState(review?.rating);
  const [hover, setHover] = useState(0);
  return (
    <div className="UserReviewOuter">
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={
                index <= (hover || rating) ? "StarReview on" : "StarReview off"
              }
              // onClick={() => setRating(index)}
              // onMouseEnter={() => setHover(index)}
              // onMouseLeave={() => setHover(rating)}
              // onClick={() => setRating(index)}
              // onMouseEnter={() => setHover(index)}
              // onMouseLeave={() => setHover(rating)}
            >
              <span className="starReview">&#9733;</span>
            </button>
          );
        })}
      </div>
      <div className="UserReviewHeader">
        <div className="UserPhoto"></div>
        <p className="UserName">{review?.username}</p>

      </div>
      <div className="UserReviewStatement">
        <p>{review?.comment}</p>
      </div>
      <div className="ReviewDate">
        <p>{new Date(review?.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default UserReviews;
