"use client";

import { useState, useEffect, FormEvent } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleLogin = async (e: FormEvent) => {
    if (e) e.preventDefault(); 
    setError(null);
    setSuccess(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setSuccess('Succes!');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unkown error');
      }
    }
  };

  const handlePresetLogin = async (presetEmail: string, presetPassword: string) => {
    setEmail(presetEmail);
    setPassword(presetPassword);
  };

  if (user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="font-bold mb-6 text-gray-800 dark:text-gray-200">You already logged in</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => handlePresetLogin('admin@example.com', 'adminadmin')}
            className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold rounded"
          >
            Login as Admin
          </button>
          <button
            type="button"
            onClick={() => handlePresetLogin('user@example.com', 'useruser')}
            className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold rounded mt-2"
          >
            Login as User
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
