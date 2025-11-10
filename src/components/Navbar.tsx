// src/components/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          EnglishComm
        </h1>

        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Learn</a>
          <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Practice</a>
          <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">About us</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="/auth" className="text-gray-700 hover:text-purple-600 font-medium">
            Log in
          </a>
          <span className="text-gray-400">|</span>
          <a href="/auth" className="text-gray-700 hover:text-purple-600 font-medium">
            Register
          </a>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
        </div>
      </div>
    </nav>
  );
}