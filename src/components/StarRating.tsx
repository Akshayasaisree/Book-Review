
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = "md",
  interactive = false,
  onRatingChange
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const getSizeClass = () => {
    switch (size) {
      case "sm": return "h-3 w-3";
      case "lg": return "h-6 w-6";
      default: return "h-4 w-4";
    }
  };
  
  const handleClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  const displayRating = hoverRating || rating;
  
  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className={`${interactive ? "cursor-pointer" : "cursor-default"} p-0 m-0 focus:outline-none`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
          >
            <Star 
              className={`${getSizeClass()} ${
                starValue <= displayRating 
                  ? "fill-yellow-400 stroke-yellow-400" 
                  : "stroke-gray-300"
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
