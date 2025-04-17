
import { BookOpen } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-[50vh]">
      <div className="relative">
        <BookOpen className="h-12 w-12 text-purple-600" />
        <div className="absolute inset-0 bg-white bg-opacity-50 rounded-full animate-pulse"></div>
      </div>
      <p className="text-gray-700 font-medium mt-4">{message}</p>
      <div className="mt-3 w-20 h-1.5 bg-purple-200 rounded-full overflow-hidden">
        <div className="h-full bg-purple-600 animate-[move_1.5s_ease-in-out_infinite]"></div>
      </div>
      <style>
        {`
          @keyframes move {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingState;
