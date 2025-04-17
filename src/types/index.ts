
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  publishedDate: string;
  genre: string[];
  isbn: string;
  pageCount: number;
  averageRating: number;
  ratingsCount: number;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  favoriteGenres?: string[];
  booksRead?: number;
  reviewsWritten?: number;
  joinedDate: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  user: User;
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  helpful: number;
}

export interface BookFilters {
  genre?: string;
  rating?: number;
  searchQuery?: string;
}
