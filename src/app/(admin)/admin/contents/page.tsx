'use client';
import { Tab } from '@headlessui/react';
import { PlusCircle, Search, ChevronDown } from 'lucide-react';
import Link from 'next/link';

function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- 가상 데이터 ---
const mockCategories = [
  {
    id: 1,
    name: '웹 해킹',
    slug: 'web-hacking',
    projectCount: 5,
    articleCount: 12,
  },
  {
    id: 2,
    name: '리버싱',
    slug: 'reversing',
    projectCount: 3,
    articleCount: 8,
  },
];
const mockProjects = [
  {
    id: 1,
    title: 'XSS 패턴 자동 탐지 스캐너',
    author: '김민준',
    category: '웹 해킹',
    createdAt: '2025-05-31',
    likes: 120,
  },
  {
    id: 3,
    title: 'SSG 동아리 홈페이지 & Hub 개발',
    author: '김민준',
    category: '웹 개발',
    createdAt: '2025-07-20',
    likes: 95,
  },
];
const mockArticles = [
  {
    id: 2,
    title: 'CSRF 토큰은 어떻게 동작하는가?',
    author: '이수진',
    category: '웹 해킹',
    createdAt: '2025-08-01',
    likes: 250,
  },
];

// --- UI 컴포넌트 ---
const AdminTable = ({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) => (
  <table className='w-full text-sm text-left text-gray-500'>
    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
      <tr>
        {headers.map((h) => (
          <th key={h} className='px-6 py-3'>
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

// ✨ 프로젝트/아티클 관리를 위한 공통 필터 컴포넌트 ✨
const ContentFilter = () => (
  <div className='flex flex-col md:flex-row justify-between items-center mb-4 gap-4'>
    <div className='relative w-full md:w-auto'>
      <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
      <input
        type='text'
        placeholder='제목으로 검색...'
        className='border rounded-lg pl-9 pr-3 py-1.5 text-sm w-full'
      />
    </div>
    <div className='flex items-center space-x-2 w-full md:w-auto'>
      <div className='relative flex-grow'>
        <select className='w-full border rounded-lg px-3 py-1.5 text-sm appearance-none'>
          <option>모든 카테고리</option>
          <option>웹 해킹</option>
          <option>리버싱</option>
        </select>
        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
      </div>
      <div className='flex items-center text-sm border rounded-md p-1 bg-white flex-shrink-0'>
        <button className='px-2 py-1 rounded font-semibold bg-gray-100 shadow-sm text-xs'>
          최신순
        </button>
        <button className='px-2 py-1 rounded text-gray-500 hover:bg-gray-100 text-xs'>
          인기순
        </button>
      </div>
    </div>
  </div>
);

export default function AdminContentPage() {
  const tabs = ['카테고리 관리', '프로젝트 관리', '아티클 관리'];

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>콘텐츠 관리</h1>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-lg bg-indigo-900/20 p-1 mb-6'>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  selected
                    ? 'bg-white text-indigo-700 shadow'
                    : 'text-gray-700 hover:bg-white/[0.8]'
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className='bg-white p-6 rounded-lg shadow'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>카테고리 목록</h2>
              <Link
                href={'/admin/content/categories/new'}
                className='flex items-center bg-indigo-600 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-indigo-700'
              >
                <PlusCircle size={16} className='mr-2' /> 새 카테고리
              </Link>
            </div>
            <AdminTable
              headers={['이름', 'Slug', '프로젝트 수', '아티클 수', '관리']}
            >
              {mockCategories.map((cat) => (
                <tr key={cat.id} className='bg-white border-b'>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {cat.name}
                  </td>
                  <td className='px-6 py-4'>{cat.slug}</td>
                  <td className='px-6 py-4'>{cat.projectCount}</td>
                  <td className='px-6 py-4'>{cat.articleCount}</td>
                  <td className='px-6 py-4'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:underline'
                    >
                      수정
                    </a>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Tab.Panel>
          <Tab.Panel className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-bold mb-4'>프로젝트 목록</h2>
            <ContentFilter />
            <AdminTable
              headers={[
                '제목',
                '작성자',
                '카테고리',
                '작성일',
                '좋아요',
                '관리',
              ]}
            >
              {mockProjects.map((post) => (
                <tr key={post.id} className='bg-white border-b'>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {post.title}
                  </td>
                  <td className='px-6 py-4'>{post.author}</td>
                  <td className='px-6 py-4'>{post.category}</td>
                  <td className='px-6 py-4'>{post.createdAt}</td>
                  <td className='px-6 py-4'>{post.likes}</td>
                  <td className='px-6 py-4'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:underline'
                    >
                      보기
                    </a>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Tab.Panel>
          <Tab.Panel className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-bold mb-4'>아티클 목록</h2>
            <ContentFilter />
            <AdminTable
              headers={[
                '제목',
                '작성자',
                '카테고리',
                '작성일',
                '좋아요',
                '관리',
              ]}
            >
              {mockArticles.map((post) => (
                <tr key={post.id} className='bg-white border-b'>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {post.title}
                  </td>
                  <td className='px-6 py-4'>{post.author}</td>
                  <td className='px-6 py-4'>{post.category}</td>
                  <td className='px-6 py-4'>{post.createdAt}</td>
                  <td className='px-6 py-4'>{post.likes}</td>
                  <td className='px-6 py-4'>
                    <a
                      href='#'
                      className='font-medium text-indigo-600 hover:underline'
                    >
                      보기
                    </a>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
