import { Book, BookFilters, Review, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { mockBooks, mockReviews, mockUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

interface AppContextProps {
  books: Book[];
  filteredBooks: Book[];
  featuredBooks: Book[];
  reviews: Review[];
  users: User[];
  currentUser: User | null;
  filters: BookFilters;
  isLoading: boolean;
  error: string | null;
  setFilters: (filters: BookFilters) => void;
  getBookById: (id: string) => Book | undefined;
  getReviewsByBookId: (bookId: string) => Review[];
  getUserById: (id: string) => User | undefined;
  addReview: (review: Omit<Review, "id" | "user" | "createdAt" | "updatedAt" | "likes" | "helpful">) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<BookFilters>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const { toast: showToast } = useToast();

  // Filter books based on filters
  useEffect(() => {
    let result = [...books];
    
    if (filters.genre) {
      result = result.filter(book => book.genre.includes(filters.genre as string));
    }
    
    if (filters.rating) {
      result = result.filter(book => book.averageRating >= (filters.rating as number));
    }
    
    if (filters.searchQuery) {
      const query = (filters.searchQuery as string).toLowerCase();
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(query) || 
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query) ||
          book.genre.some(g => g.toLowerCase().includes(query))
      );
    }
    
    setFilteredBooks(result);
  }, [books, filters]);

  // Set featured books
  useEffect(() => {
    setFeaturedBooks(books.filter(book => book.featured));
  }, [books]);

  // Get book by id
  const getBookById = (id: string) => {
    return books.find(book => book.id === id);
  };

  // Get reviews by book id
  const getReviewsByBookId = (bookId: string) => {
    return reviews.filter(review => review.bookId === bookId);
  };

  // Get user by id
  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  // Add a new review
  const addReview = (reviewData: Omit<Review, "id" | "user" | "createdAt" | "updatedAt" | "likes" | "helpful">) => {
    if (!currentUser) {
      setError("You must be logged in to add a review");
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      user: currentUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      helpful: 0,
      ...reviewData,
    };

    setReviews(prev => [...prev, newReview]);

    // Update book ratings
    const bookReviews = [...getReviewsByBookId(reviewData.bookId), newReview];
    const avgRating = bookReviews.reduce((sum, review) => sum + review.rating, 0) / bookReviews.length;
    
    setBooks(prev => 
      prev.map(book => 
        book.id === reviewData.bookId 
          ? { 
              ...book, 
              averageRating: parseFloat(avgRating.toFixed(1)), 
              ratingsCount: book.ratingsCount + 1 
            } 
          : book
      )
    );
  };

  // Modified login function to work with any password for demo accounts
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show success toast notification
        toast.success("Successfully logged in", {
          description: `Welcome back, ${user.name}!`,
        });
        
        console.log("Login successful:", user);
        return;
      } 
      
      throw new Error('Invalid email or password');
    } catch (err) {
      setError((err as Error).message);
      
      // Show error toast notification
      toast.error("Login failed", {
        description: (err as Error).message,
      });
      
      console.error("Login error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Improved logout function with toast notification
  const logout = () => {
    const userName = currentUser?.name;
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    
    // Show logout toast notification
    toast.info("Logged out", {
      description: userName ? `Goodbye, ${userName}!` : "You've been logged out successfully",
    });
    
    console.log("User logged out");
  };

  // Check for logged in user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        console.log("User restored from localStorage:", user);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        books,
        filteredBooks,
        featuredBooks,
        reviews,
        users,
        currentUser,
        filters,
        isLoading,
        error,
        setFilters,
        getBookById,
        getReviewsByBookId,
        getUserById,
        addReview,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
