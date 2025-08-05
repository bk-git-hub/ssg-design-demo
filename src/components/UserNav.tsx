'use client';

import { useState, useRef, useEffect, RefObject } from 'react';
import Link from 'next/link';
import { UserCircle, LogOut } from 'lucide-react';

// --- ✅ 드롭다운 외부 클릭 감지를 위한 커스텀 Hook (제네릭 사용) ---
const useOnClickOutside = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// --- ✅ UserNav 컴포넌트 ---
export default function UserNav() {
  const user = {
    name: '김민준',
    image: 'https://i.pravatar.cc/150?u=1',
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ 타입 오류 없이 사용 가능

  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full'
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || 'User profile'}
            className='w-10 h-10 rounded-full'
          />
        ) : (
          <div className='w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold'>
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {isDropdownOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 z-10'>
          <div className='px-4 py-2 border-b'>
            <p className='text-sm font-semibold text-gray-800'>{user.name}</p>
          </div>
          <Link
            href='/my'
            onClick={() => setDropdownOpen(false)}
            className='flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            <UserCircle size={16} className='mr-2' />
            마이페이지
          </Link>
          <button
            onClick={() => {
              setDropdownOpen(false);
              console.log('Signed out!');
            }}
            className='flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
          >
            <LogOut size={16} className='mr-2' />
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
