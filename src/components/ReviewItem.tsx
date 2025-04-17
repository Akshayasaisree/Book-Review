
import { Review } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, Flag } from "lucide-react";
import StarRating from "./StarRating";

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const formattedDate = formatDistanceToNow(new Date(review.createdAt), { addSuffix: true });
  
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm mb-4">
      <div className="flex items-start gap-4">
        <img 
          src={review.user.avatar} 
          alt={review.user.name} 
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold">{review.user.name}</h4>
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-xs text-gray-500">{formattedDate}</span>
              </div>
            </div>
            
            <button 
              type="button"
              aria-label="Report review"
              className="text-gray-400 hover:text-gray-600"
            >
              <Flag className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-gray-700 mb-3">{review.text}</p>
          
          <div className="flex items-center gap-6">
            <button 
              type="button"
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
