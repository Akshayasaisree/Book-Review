
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import Layout from "@/components/Layout";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Star, Users } from "lucide-react";

const HomePage = () => {
  const { featuredBooks, books } = useApp();
  
  // Get recent reviews
  const recentReviews = useApp().reviews.slice(0, 3);
  
  // Calculate total stats
  const totalBooks = books.length;
  const totalReviews = useApp().reviews.length;
  const totalUsers = useApp().users.length;
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of book lovers to find, review, and share the best reads across all genres.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/books">
                <Button variant="purple" size="lg" className="w-full sm:w-auto">
                  Browse Books
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Join Community
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-16 text-center">
              <div className="p-4">
                <div className="flex justify-center mb-2">
                  <Book className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalBooks}+</p>
                <p className="text-sm text-gray-600">Books</p>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-2">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalReviews}+</p>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-2">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalUsers}+</p>
                <p className="text-sm text-gray-600">Active Readers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Books</h2>
            <Link to="/books" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} featured />
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Reviews Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Recent Reviews</h2>
            <Link to="/books" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
              <span>Browse Books</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentReviews.map((review) => {
              const book = useApp().getBookById(review.bookId);
              if (!book) return null;
              
              return (
                <div 
                  key={review.id} 
                  className="bg-white rounded-lg shadow p-6 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-16 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-bold text-lg leading-tight mb-1">
                        <Link 
                          to={`/books/${book.id}`} 
                          className="hover:text-purple-600 transition-colors"
                        >
                          {book.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                      <div className="flex items-center gap-1">
                        <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4" />
                        <span className="text-sm font-semibold">{review.rating}</span>
                        <span className="text-xs text-gray-500">by {review.user.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm flex-1">
                    {review.text.length > 150 
                      ? `${review.text.substring(0, 150)}...` 
                      : review.text
                    }
                  </p>
                  
                  <div className="mt-4">
                    <Link 
                      to={`/books/${book.id}`}
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Read full review
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Join Community CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Community of Book Lovers
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Create an account to track your reading, write reviews, connect with fellow readers, and get personalized book recommendations.
            </p>
            <Link to="/signup">
              <Button 
                variant="default" 
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
