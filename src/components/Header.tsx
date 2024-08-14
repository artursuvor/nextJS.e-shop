import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '../firebase/firebaseConfig'; 

const Header = () => {
  const [user, loading] = useAuthState(auth); 
  const cartItemQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="flex justify-between items-center p-5 bg-gray-100 dark:bg-gray-800">
      <nav className="flex justify-around space-x-4">
        <Link href="/" className="text-lg font-medium px-2 py-1 text-gray-800 dark:text-gray-200">
          Main
        </Link>
        <div className="relative px-2 py-1 inline-block">
          <Link href="/cart" className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Cart
          </Link>
          {cartItemQuantity > 0 && (
            <p className='absolute bottom-5 left-9 bg-red-500 rounded-full text-white text-xs px-2 py-1'>
              {cartItemQuantity}
            </p>
          )}
        </div>
        {loading ? (
          <p className="text-lg font-medium px-2 py-1 text-gray-800 dark:text-gray-200">Loading...</p>
        ) : user ? (
          <div className="flex items-center">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {user.email} 
            </p>
            <button
              onClick={() => auth.signOut()} 
              className="ml-4 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-lg font-medium text-gray-800 px-2 py-1 dark:text-gray-200">
            Login
          </Link>
        )}
      </nav>
      <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
