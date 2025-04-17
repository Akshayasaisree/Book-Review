
import { useApp } from "@/context/AppContext";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Book, Edit, Library, Pencil, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";

const ProfilePage = () => {
  const { currentUser, getReviewsByBookId, books } = useApp();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) {
    return null; // Will redirect via useEffect
  }
  
  // Get user's reviews
  const userReviews = books
    .map(book => {
      const reviews = getReviewsByBookId(book.id);
      const userReview = reviews.find(review => review.userId === currentUser.id);
      if (userReview) {
        return { ...userReview, book };
      }
      return null;
    })
    .filter(Boolean);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
          <div className="px-6 py-4 md:px-8 md:py-6">
            <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-4 md:mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
                <p className="text-gray-600">Member since {new Date(currentUser.joinedDate).toLocaleDateString()}</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-auto">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              </div>
            </div>
            
            {currentUser.bio && (
              <p className="text-gray-700 mb-4">{currentUser.bio}</p>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-center mb-1">
                  <Book className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentUser.booksRead || 0}</p>
                <p className="text-sm text-gray-600">Books Read</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-center mb-1">
                  <Pencil className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentUser.reviewsWritten || 0}</p>
                <p className="text-sm text-gray-600">Reviews Written</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-center mb-1">
                  <Library className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{currentUser.favoriteGenres?.length || 0}</p>
                <p className="text-sm text-gray-600">Favorite Genres</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-center mb-1">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">4.2</p>
                <p className="text-sm text-gray-600">Avg. Rating</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Favorite Genres */}
        {currentUser.favoriteGenres && currentUser.favoriteGenres.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Favorite Genres</h2>
            <div className="flex flex-wrap gap-2">
              {currentUser.favoriteGenres.map((genre) => (
                <span 
                  key={genre} 
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* User Reviews */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Reviews</h2>
          
          {userReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex p-4">
                    <img 
                      src={review.book.coverImage} 
                      alt={review.book.title} 
                      className="w-16 h-24 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{review.book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {review.book.author}</p>
                      <div className="flex items-center gap-2 mb-1">
                        <StarRating rating={review.rating} size="sm" />
                        <span className="text-sm text-gray-700">Your rating</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <p className="text-gray-700 text-sm">
                      {review.text.length > 150 
                        ? `${review.text.substring(0, 150)}...` 
                        : review.text
                      }
                    </p>
                    
                    <div className="mt-3 flex justify-end">
                      <Button variant="ghost" size="sm" className="text-purple-600">
                        <Edit className="h-3 w-3 mr-1" />
                        <span>Edit Review</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <User className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">You haven't reviewed any books yet.</p>
              <Button variant="purple" onClick={() => navigate("/books")}>
                Browse Books to Review
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
