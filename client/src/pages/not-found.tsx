import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-center px-6">
      <div className="mb-8 p-6 bg-red-50 rounded-full">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>
      <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Page not found</h1>
      <p className="text-gray-500 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <button className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
