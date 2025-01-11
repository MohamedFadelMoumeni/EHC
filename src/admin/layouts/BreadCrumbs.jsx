import { Link, useLocation } from 'react-router-dom';

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean); // Split the URL path and filter out empty strings

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link to="/admin" className="text-blue-500 hover:text-blue-600">Dashboard</Link>
      {pathnames.map((value, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`; // Construct the path dynamically

        return (
          <span key={index} className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <Link
              to={path}
              className="text-blue-500 hover:text-blue-600 capitalize"
            >
              {value.replace(/-/g, ' ')} {/* Replaces hyphens with spaces and capitalizes */}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;
