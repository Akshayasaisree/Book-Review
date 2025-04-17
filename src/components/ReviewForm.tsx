
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { useApp } from "@/context/AppContext";

interface ReviewFormProps {
  bookId: string;
  onSuccess?: () => void;
}

const ReviewForm = ({ bookId, onSuccess }: ReviewFormProps) => {
  const { addReview, currentUser } = useApp();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!currentUser) {
      setError("You must be logged in to submit a review.");
      return;
    }
    
    if (rating === 0) {
      setError("Please select a rating before submitting.");
      return;
    }
    
    if (reviewText.trim().length < 10) {
      setError("Your review must be at least 10 characters long.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addReview({
        bookId,
        userId: currentUser.id,
        rating,
        text: reviewText.trim(),
      });
      
      // Reset form
      setRating(0);
      setReviewText("");
      
      // Call success callback if provided
      if (onSuccess) onSuccess();
      
    } catch (err) {
      setError("Failed to submit your review. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!currentUser) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center">
        <h3 className="font-semibold text-lg mb-2">Share Your Thoughts</h3>
        <p className="text-gray-600 mb-4">Please sign in to leave a review.</p>
        <Button variant="purple">Sign In</Button>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
      <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Rating
          </label>
          <StarRating 
            rating={rating} 
            interactive={true} 
            onRatingChange={setRating} 
            size="lg" 
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            id="review"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Share your thoughts about this book..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}
        
        <Button 
          type="submit" 
          variant="purple" 
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
