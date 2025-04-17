
import { Book } from "@/types";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface BookCardProps {
  book: Book;
  featured?: boolean;
}

const BookCard = ({ book, featured = false }: BookCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div 
      className={`group flex flex-col ${
        featured 
          ? "bg-gradient-to-br from-purple-100 to-white p-6 rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl" 
          : "bg-white p-4 rounded-lg shadow transition-all hover:-translate-y-1 hover:shadow-md"
      }`}
    >
      <Link to={`/books/${book.id}`}>
        <div className="relative aspect-[2/3] mb-4 overflow-hidden rounded-md">
          <img 
            src={book.coverImage} 
            alt={`Cover of ${book.title}`} 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
            <div className="flex items-center gap-1">
              <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4" />
              <span className="text-sm font-semibold">{book.averageRating}</span>
              <span className="text-xs opacity-75">({book.ratingsCount})</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="flex-1 flex flex-col">
        <Link to={`/books/${book.id}`} className="block">
          <h3 className="font-bold text-lg leading-tight hover:text-purple-600 transition-colors">
            {featured ? book.title : truncateText(book.title, 40)}
          </h3>
          <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        </Link>
        
        {featured && (
          <p className="text-gray-700 text-sm mb-3 flex-1">
            {truncateText(book.description, 150)}
          </p>
        )}
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-2">
            {book.genre.slice(0, 2).map((genre) => (
              <span 
                key={genre} 
                className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
            {book.genre.length > 2 && (
              <span className="text-xs text-gray-500">+{book.genre.length - 2} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
