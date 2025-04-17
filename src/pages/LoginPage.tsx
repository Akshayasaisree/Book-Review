
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn } from "lucide-react";
import LoadingState from "@/components/LoadingState";

const LoginPage = () => {
  const { login, isLoading, error, currentUser } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Simple validation
    if (!email.trim()) {
      setFormError("Please enter your email");
      return;
    }
    
    if (!password.trim()) {
      setFormError("Please enter your password");
      return;
    }
    
    try {
      setLocalLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setFormError((err as Error).message || "Login failed");
      console.error("Login form error:", err);
    } finally {
      setLocalLoading(false);
    }
  };
  
  if (isLoading || localLoading) {
    return <LoadingState message="Signing in..." />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <span className="font-bold text-2xl text-gray-900">Page<span className="text-purple-600">Turner</span></span>
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Welcome back! Sign in to your account.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-800">
                Forgot password?
              </a>
            </div>
            
            {(formError || error) && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {formError || error}
              </div>
            )}
            
            <Button
              type="submit"
              variant="purple"
              className="w-full"
              disabled={isLoading || localLoading}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {isLoading || localLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-800">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        
        {/* Demo Accounts */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Demo Accounts</h3>
          <p className="text-sm text-gray-600 mb-2">Use any of these email addresses to sign in (any password works):</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>jane.austen@example.com</li>
            <li>ernest.hemingway@example.com</li>
            <li>agatha.christie@example.com</li>
            <li>oscar.wilde@example.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
