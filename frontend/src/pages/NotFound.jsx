import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-colorT">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn inline-block mt-6">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
