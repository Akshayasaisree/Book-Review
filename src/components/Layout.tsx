
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Menu, X, LogIn, LogOut, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <span className="font-bold text-xl text-gray-900">Page<span className="text-purple-600">Turner</span></span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</Link>
              <Link to="/books" className="text-gray-700 hover:text-purple-600 font-medium">Browse Books</Link>
              {currentUser && (
                <Link to="/profile" className="text-gray-700 hover:text-purple-600 font-medium">My Profile</Link>
              )}
            </nav>
            
            {/* Authentication Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <Link to="/profile" className="flex items-center gap-2">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{currentUser.name}</span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={logout}
                    className="text-gray-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="ml-1">Logout</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-700">
                      <LogIn className="h-4 w-4" />
                      <span className="ml-1">Login</span>
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="purple">
                      <User className="h-4 w-4" />
                      <span className="ml-1">Sign Up</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  <span className="font-bold text-xl text-gray-900">Page<span className="text-purple-600">Turner</span></span>
                </Link>
                
                <button 
                  className="text-gray-700" 
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-4 text-lg">
                <Link 
                  to="/" 
                  className="py-2 text-gray-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/books" 
                  className="py-2 text-gray-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Books
                </Link>
                {currentUser && (
                  <Link 
                    to="/profile" 
                    className="py-2 text-gray-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                )}
                
                <div className="border-t border-gray-200 my-2 pt-4">
                  {currentUser ? (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{currentUser.name}</div>
                          <div className="text-sm text-gray-500">{currentUser.email}</div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="purple" className="w-full">
                          <User className="h-4 w-4 mr-2" />
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-400" />
                <span className="font-bold text-xl">Page<span className="text-purple-400">Turner</span></span>
              </Link>
              <p className="text-sm text-gray-400 mt-1">Your next great read is just a click away.</p>
            </div>
            
            <div className="flex flex-col text-center md:text-right">
              <div className="mb-2">
                <Link to="/about" className="text-gray-300 hover:text-white mr-4">About</Link>
                <Link to="/privacy" className="text-gray-300 hover:text-white mr-4">Privacy</Link>
                <Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link>
              </div>
              <p className="text-sm text-gray-400">© 2023 PageTurner. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
