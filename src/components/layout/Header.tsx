'use client'; // 클릭 이벤트를 처리해야 하므로 클라이언트 컴포넌트로 선언

import Link from 'next/link';
import UserNav from '@/components/UserNav';
import { ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// --- 가상 데이터 (모든 카테고리 포함) ---
const categories = [
  { name: '웹 해킹', slug: 'web-hacking' },
  { name: '리버싱', slug: 'reversing' },
  { name: '시스템 해킹', slug: 'system-hacking' },
  { name: '디지털 포렌식', slug: 'digital-forensics' },
  { name: '네트워크 보안', slug: 'network-security' },
  { name: '악성코드 분석', slug: 'malware-analysis' },
  { name: '암호학', slug: 'cryptography' },
  { name: '모바일 해킹', slug: 'mobile-hacking' },
  { name: '보안 관제', slug: 'security-operations' },
  { name: '자료구조/알고리즘', slug: 'algorithms' },
  { name: '운영체제', slug: 'operating-systems' },
  { name: 'CTF', slug: 'ctf' },
  { name: '개발 문화 & 커리어', slug: 'dev-culture' },
];

export default function Header() {
  // 드롭다운 메뉴의 열림/닫힘 상태를 관리
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='container mx-auto flex h-16 items-center justify-between px-6'>
        {/* 왼쪽: 로고 및 네비게이션 */}
        <nav className='flex items-center space-x-8'>
          <Link
            href='/'
            className='text-xl font-bold text-gray-800 hover:text-indigo-600'
          >
            SSG
          </Link>

          <div className='hidden md:flex items-center space-x-6'>
            <Link
              href='/'
              className='text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors'
            >
              동아리홈
            </Link>

            {/* ✨ 학습 분야 메가 메뉴 드롭다운 ✨ */}
            <div className='relative'>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)} // 클릭으로 상태 토글
                className='flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none'
              >
                <span>학습 분야</span>
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <Link
              href='/members'
              className='text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors'
            >
              Members
            </Link>
            <Link
              href='/projects'
              className='text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors'
            >
              Projects
            </Link>
            <Link
              href='/articles'
              className='text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors'
            >
              Articles
            </Link>
          </div>
        </nav>

        {/* 오른쪽: 사용자 정보 */}
        <div className='flex items-center'>
          <UserNav />
        </div>
      </div>

      {/* ✨ 메가 메뉴 드롭다운 내용 (화면 전체 너비) ✨ */}
      {isDropdownOpen && (
        <div className='absolute top-full left-0 w-full bg-white border-t border-b shadow-md'>
          <div className='container mx-auto p-8'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6'>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  onClick={() => setDropdownOpen(false)} // 링크 클릭 시 메뉴 닫기
                  className='block p-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium'
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
