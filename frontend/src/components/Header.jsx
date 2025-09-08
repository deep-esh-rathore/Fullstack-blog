import React from 'react'
import { useSelector } from 'react-redux';
import { clearMessage } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {Logo } from './index'
import LogoutBtn from './LogoutBtn';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message);

  const navItems = [
    { name: 'Home', path: '/', status: true },
    { name: 'About', path: '/about', status: true },
    { name: 'Add-Post', path: '/posts/create', status: authStatus },
    { name: 'Sign-in', path: '/login', status: !authStatus },
    { name: 'Sign-up', path: '/signup', status: !authStatus },
  ];

  return (
    <>
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 
    text-white px-8 py-4 flex items-center justify-between shadow-md">
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <nav>
        <ul className="flex gap-6 list-none m-0 p-0">
          {navItems.map(
            (item) =>
              item.status && (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white font-medium px-4 py-2 rounded 
                    transition-colors hover:text-pink-300"
                  >
                    {item.name}
                  </Link>
                </li>
              )
          )}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        {authStatus && <LogoutBtn />}
      </div>
    </header>

    {message && (
        <div className="relative bg-pink-100 text-pink-800 px-6 py-2 text-center text-sm font-normal shadow-md flex items-center justify-center">
          <span>{message}</span>
          <button
            onClick={() => dispatch(clearMessage())}
            className="absolute right-4 border border-pink-800 rounded-full px-1 py-1 text-xs hover:cursor-pointer hover:text transition-colors"
          >
            ❌
          </button>
        </div>
      )}
    </>
  );
}
export default Header