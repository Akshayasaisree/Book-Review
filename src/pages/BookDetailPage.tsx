
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import Layout from "@/components/Layout";
import StarRating from "@/components/StarRating";
import ReviewItem from "@/components/ReviewItem";
import ReviewForm from "@/components/ReviewForm";
import { Book, BookOpen, Calendar, ChevronLeft, Hash, Layers, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Book as BookType } from "@/types";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, getReviewsByBookId, books } = useApp();
  const [book, setBook] = useState<BookType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    
    try {
      if (!id) {
        throw new Error("Book ID is required");
      }
      
      const foundBook = getBookById(id);
      
      if (!foundBook) {
        throw new Error("Book not found");
      }
      
      setBook(foundBook);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [id, getBookById]);
  
  const reviews = id ? getReviewsByBookId(id) : [];
  
  // Function to get book recommendations
  const getRecommendations = (currentBook: BookType) => {
    return books
      .filter(b => 
        b.id !== currentBook.id && 
        b.genre.some(genre => currentBook.genre.includes(genre))
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse flex flex-col md:flex-row md:gap-8 w-full max-w-4xl">
            <div className="md:w-1/3">
              <div className="aspect-[2/3] bg-gray-200 rounded-lg"></div>
            </div>
            <div className="md:w-2/3 mt-6 md:mt-0">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The requested book could not be found."}</p>
          <Link to="/books">
            <Button variant="purple">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const recommendations = getRecommendations(book);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/books" className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm font-medium">
            <ChevronLeft className="h-4 w-4" />
            Back to Books
          </Link>
        </div>
        
        {/* Book Details */}
        <div className="flex flex-col md:flex-row md:gap-8 mb-12">
          {/* Book Cover */}
          <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
            <div className="sticky top-24">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={book.coverImage} 
                  alt={`Cover of ${book.title}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Book Info */}
          <div className="md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
            
            <div className="flex items-center gap-2 mb-6">
              <StarRating rating={book.averageRating} size="lg" />
              <span className="text-lg font-semibold">{book.averageRating}</span>
              <span className="text-gray-500">({book.ratingsCount} ratings)</span>
            </div>
            
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700">{book.description}</p>
            </div>
            
            {/* Book Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Published</span>
                </div>
                <p className="font-medium">{book.publishedDate}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Hash className="h-4 w-4" />
                  <span className="text-sm">ISBN</span>
                </div>
                <p className="font-medium">{book.isbn}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm">Pages</span>
                </div>
                <p className="font-medium">{book.pageCount}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">Genre</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {book.genre.map((g) => (
                    <span 
                      key={g} 
                      className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Review Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Reviews ({reviews.length})
            </h2>
            
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <User className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No reviews yet</h3>
                <p className="text-gray-600 mb-4">Be the first to review this book!</p>
              </div>
            )}
          </div>
          
          {/* Add Review Form */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Review
            </h2>
            <ReviewForm bookId={book.id} />
            
            {/* Recommended Books */}
            {recommendations.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Readers Also Enjoyed
                </h3>
                
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <Link to={`/books/${rec.id}`} key={rec.id} className="block">
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <img 
                          src={rec.coverImage} 
                          alt={rec.title} 
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 leading-tight">{rec.title}</h4>
                          <p className="text-sm text-gray-600">by {rec.author}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <StarRating rating={rec.averageRating} size="sm" />
                            <span className="text-xs text-gray-500">({rec.ratingsCount})</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetailPage;
