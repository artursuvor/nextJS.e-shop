import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher'; 

const Header = () => {

  return (
    <header className="flex justify-between items-center p-5 bg-gray-100 dark:bg-gray-800">
      <nav className="flex justify-around space-x-4">
        <Link href="/" className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Main
        </Link>
        <Link href="/cart" className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Cart
        </Link>
        <Link href="/login" className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Login
        </Link>
      </nav>
      <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
