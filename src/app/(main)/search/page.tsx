'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Projector, FileText, MessageSquare } from 'lucide-react';

// --- 가상 데이터 ---
const searchResults = [
  {
    type: 'PROJECT',
    title: 'XSS 패턴 자동 탐지 스캐너',
    summary: 'Python 기반으로 URL의 XSS 취약점을 자동으로 탐지하는 도구',
    team: ['김민준', '이수진'],
    link: '/projects/xss-scanner-project',
  },
  {
    type: 'ARTICLE',
    title: 'XSS 공격의 모든 것: Stored, Reflected, DOM',
    author: '박보안',
    snippet:
      '가장 널리 알려진 웹 취약점 중 하나인 XSS(Cross-Site Scripting)의 세 가지 유형을 알아보고...',
    link: '/articles/xss-deep-dive',
  },
  {
    type: 'DOCUMENT',
    title: 'XSS 스캐너 프로젝트 기획서',
    parentProject: 'XSS 패턴 자동 탐지 스캐너',
    snippet:
      '본 프로젝트의 목표는 기본적인 Reflected XSS 패턴을 탐지하는 Python 기반 스캐너를 개발하는 것입니다.',
    link: '/projects/xss-scanner-project/documents/plan',
  },
  {
    type: 'ARTICLE',
    title: "Dreamhack 'Simple Board' 문제 풀이 (XSS 파트)",
    author: '김민준',
    snippet:
      '...두 번째 문제에서는 필터링을 우회하는 XSS 페이로드를 구성하는 것이 핵심이었습니다...',
    link: '/articles/dreamhack-simple-board',
  },
];

// --- UI 컴포넌트 ---
const Highlight = ({
  text,
  highlight,
}: {
  text?: string | null;
  highlight: string;
}) => {
  if (!text) {
    return null;
  }
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className='bg-yellow-200 font-bold'>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

const SearchResultItem = ({
  item,
  query,
}: {
  item: (typeof searchResults)[0];
  query: string;
}) => {
  const typeInfo: { [key: string]: { icon: React.ReactNode; color: string } } =
    {
      ARTICLE: { icon: <FileText size={18} />, color: 'text-blue-600' },
      PROJECT: { icon: <Projector size={18} />, color: 'text-green-600' },
      DOCUMENT: { icon: <FileText size={18} />, color: 'text-purple-600' },
    };
  const summaryText = (item as any).summary || (item as any).snippet || '';
  return (
    <div className='border-b py-6'>
      <div
        className={`flex items-center text-sm font-semibold mb-1 ${
          typeInfo[item.type].color
        }`}
      >
        {typeInfo[item.type].icon}
        <span className='ml-2'>{item.type}</span>
      </div>
      <Link href={item.link} className='block group'>
        <h2 className='text-xl font-bold text-gray-800 group-hover:text-indigo-600'>
          <Highlight text={item.title} highlight={query} />
        </h2>
        <p className='text-gray-600 mt-2 text-sm'>
          <Highlight text={summaryText} highlight={query} />
        </p>
        <div className='text-xs text-gray-500 mt-3'>
          {item.type === 'PROJECT' && `${(item as any).team.join(', ')} 참여`}
          {item.type === 'ARTICLE' && `by ${(item as any).author}`}
          {item.type === 'DOCUMENT' &&
            `in project: ${(item as any).parentProject}`}
        </div>
      </Link>
    </div>
  );
};

export default function HubSearchPage() {
  const searchQuery = 'XSS';

  const filterTypes = [
    { label: '전체', key: 'ALL' },
    { label: '아티클', key: 'ARTICLE' },
    { label: '프로젝트', key: 'PROJECT' },
    { label: '도큐먼트', key: 'DOCUMENT' },
  ];

  const [filterKey, setFilterKey] = useState('ALL');

  const filteredResults = searchResults.filter((item) => {
    if (filterKey === 'ALL') return true;
    return item.type === filterKey;
  });

  return (
    <div className='bg-white min-h-screen'>
      <main className='container mx-auto px-4 py-8'>
        <div className='relative mb-8'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            type='text'
            defaultValue={searchQuery}
            className='w-full border rounded-lg pl-12 pr-4 py-3 text-lg'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <aside className='md:col-span-1'>
            <div className='sticky top-24'>
              <h3 className='font-bold mb-3'>검색 결과 유형</h3>
              <nav className='flex flex-col space-y-2'>
                {filterTypes.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setFilterKey(type.key)}
                    className={`p-2 rounded-md text-left ${
                      filterKey === type.key
                        ? 'font-semibold bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {type.label} (
                    {type.key === 'ALL'
                      ? searchResults.length
                      : searchResults.filter((it) => it.type === type.key)
                          .length}
                    )
                  </button>
                ))}
              </nav>
            </div>
          </aside>
          <div className='md:col-span-3'>
            <p className='text-sm text-gray-600 mb-4'>
              <strong>'{searchQuery}'</strong>에 대한 검색 결과 총{' '}
              {filteredResults.length}개
            </p>
            <div>
              {filteredResults.map((item, index) => (
                <SearchResultItem key={index} item={item} query={searchQuery} />
              ))}
            </div>
            <div className='flex justify-center mt-8'>
              <div className='text-gray-500'>[ 페이지네이션 ]</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
