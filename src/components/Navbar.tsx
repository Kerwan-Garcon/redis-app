import Link from "next/link";

const Navbar = ({ type }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <span className="cursor-pointer text-white text-xl font-bold">
              Educative Platform
            </span>
          </Link>
        </div>

        {/* Menu Items */}
        <ul className="flex space-x-4">
          <li>
            <Link href={`/courses?type=${type}`}>
              <span className="cursor-pointer text-white hover:bg-gray-700 px-3 py-2 rounded">
                Courses
              </span>
            </Link>
          </li>
          <li>
            <Link href={`/profile?type=${type}`}>
              <span className="cursor-pointer text-white hover:bg-gray-700 px-3 py-2 rounded">
                Profil
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
