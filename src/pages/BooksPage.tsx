
import { useApp } from "@/context/AppContext";
import Layout from "@/components/Layout";
import BookCard from "@/components/BookCard";
import BookSearch from "@/components/BookSearch";
import { Book } from "lucide-react";

const BooksPage = () => {
  const { filteredBooks, filters } = useApp();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Browse Books</h1>
        </div>
        
        {/* Search and Filter Component */}
        <BookSearch />
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
            {filters.genre && ` in "${filters.genre}"`}
            {filters.rating && ` with ${filters.rating}+ stars`}
            {filters.searchQuery && ` matching "${filters.searchQuery}"`}
          </p>
        </div>
        
        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No books found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BooksPage;
