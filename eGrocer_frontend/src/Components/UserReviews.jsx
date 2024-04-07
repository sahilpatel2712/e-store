import React, { useState } from "react";

const UserReviews = ({ index, review }) => {
  const [rating, setRating] = useState(review?.ratings);
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
        <p className="UserName m-0">{review?.User?.name}</p>
      </div>
      <div className="UserReviewStatement">
        <p className="m-0">{review?.reviews}</p>
      </div>
      <div className="ReviewDate">
        <p className="m-0">{new Date(review?.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default UserReviews;
