
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookSearch = () => {
  const { setFilters, books } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique genres from books
  const genres = [...new Set(books.flatMap(book => book.genre))].sort();
  
  // Apply filters when they change
  useEffect(() => {
    const filters = {
      ...(searchQuery && { searchQuery }),
      ...(selectedGenre && { genre: selectedGenre }),
      ...(selectedRating && { rating: selectedRating }),
    };
    
    setFilters(filters);
  }, [searchQuery, selectedGenre, selectedRating, setFilters]);
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre(undefined);
    setSelectedRating(undefined);
  };
  
  const hasActiveFilters = searchQuery || selectedGenre || selectedRating;
  
  return (
    <div className="mb-8">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          className="block w-full pl-10 pr-20 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          placeholder="Search by title, author, or genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline-block">Filters</span>
            {hasActiveFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
                {(selectedGenre ? 1 : 0) + (selectedRating ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Filters</h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select
                id="genre-filter"
                className="block w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={selectedGenre || ""}
                onChange={(e) => setSelectedGenre(e.target.value || undefined)}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rating
              </label>
              <select
                id="rating-filter"
                className="block w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={selectedRating || ""}
                onChange={(e) => setSelectedRating(Number(e.target.value) || undefined)}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Stars</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
