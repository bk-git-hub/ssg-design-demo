import Link from 'next/link';
import { Search, ListFilter, PlusCircle, X } from 'lucide-react';

// --- 가상 데이터 ---
const allArticles = [
  {
    id: 1,
    title: 'CSRF 토큰은 어떻게 동작하는가? 상세 분석',
    author: '이수진',
    categories: ['웹 해킹'],
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80',
    tags: ['CSRF', 'Web Security'],
  },
  {
    id: 2,
    title: "Dreamhack 'Simple Board' 문제 풀이 (Write-up)",
    author: '김민준',
    categories: ['CTF', '웹 해킹'],
    imageUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80',
    tags: ['Web Hacking', 'SQLi'],
  },
  {
    id: 3,
    title: '보안 뉴스: Log4j 취약점, 2년이 지난 지금은?',
    author: '박준형',
    categories: ['보안 뉴스'],
    imageUrl:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&q=80',
    tags: ['Log4j', 'Vulnerability'],
  },
  {
    id: 4,
    title: 'PE 파일 구조 완전 정복',
    author: '박보안',
    categories: ['리버싱'],
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
    tags: ['Reversing', 'Windows'],
  },
  {
    id: 5,
    title: 'IDA Pro 기본 사용법 가이드',
    author: '최고수',
    categories: ['리버싱'],
    imageUrl:
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80',
    tags: ['Tool', 'Reversing'],
  },
  {
    id: 6,
    title: '메모리 포렌식 기초: Volatility 사용법',
    author: '정데이터',
    categories: ['포렌식'],
    imageUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80',
    tags: ['Forensics', 'Memory'],
  },
  {
    id: 7,
    title: '효과적인 코드 리뷰를 위한 5가지 팁',
    author: '김민준',
    categories: ['개발 문화'],
    imageUrl:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80',
    tags: ['Collaboration', 'Soft Skills'],
  },
  {
    id: 8,
    title: '버퍼 오버플로우 공격의 원리와 실제',
    author: '박보안',
    categories: ['시스템 해킹'],
    imageUrl:
      'https://images.unsplash.com/photo-1614741118884-62ac14371513?w=500&q=80',
    tags: ['BoF', 'System Hacking'],
  },
];
const allCategories = [
  '웹 해킹',
  '리버싱',
  '포렌식',
  'CTF',
  '개발 문화',
  '시스템 해킹',
  '네트워크 보안',
  '악성코드 분석',
  '암호학',
];

// --- UI 컴포넌트 ---
const ArticleCard = ({ article }: { article: (typeof allArticles)[0] }) => (
  <Link
    href='#'
    className='block border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow bg-white'
  >
    <div className='overflow-hidden'>
      <img
        src={article.imageUrl}
        alt={article.title}
        className='w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300'
      />
    </div>
    <div className='p-4'>
      <div className='flex flex-wrap gap-1 mb-1'>
        {article.categories.map((cat) => (
          <span key={cat} className='text-xs font-semibold text-indigo-600'>
            {cat}
          </span>
        ))}
      </div>
      <h3 className='font-semibold text-gray-800 h-12'>{article.title}</h3>
      <p className='text-sm text-gray-500 mt-2'>by {article.author}</p>
    </div>
  </Link>
);

const FilterSidebar = () => (
  <aside>
    <div className='sticky top-24 space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-3 flex items-center'>
          <ListFilter size={18} className='mr-2' /> 필터
        </h3>
      </div>
      <div>
        <h3 className='text-sm font-bold text-gray-500 mb-3'>카테고리</h3>
        <div className='space-y-2 max-h-60 overflow-y-auto border rounded-md p-2'>
          {allCategories.map((cat) => (
            <label
              key={cat}
              className='flex items-center text-gray-700 p-1 rounded hover:bg-gray-100'
            >
              <input type='checkbox' className='h-4 w-4 rounded' />
              <span className='ml-2'>{cat}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label
          htmlFor='tag-input'
          className='block text-sm font-bold text-gray-500 mb-2'
        >
          기술 태그
        </label>
        <input
          id='tag-input'
          type='text'
          placeholder='예: React, SQLi 검색...'
          className='w-full border rounded-lg px-3 py-2'
        />
        <div className='flex flex-wrap gap-2 mt-3'>
          <span className='bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center'>
            #Web Hacking
            <button className='ml-1.5 text-indigo-200 hover:text-white'>
              <X size={14} />
            </button>
          </span>
        </div>
      </div>
    </div>
  </aside>
);

export default function ArticlesPage() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-12'>
        <section className='mb-12'>
          <h1 className='text-5xl font-extrabold mb-2'>Articles</h1>
          <p className='text-lg text-gray-600'>
            동아리의 모든 지식과 경험을 이곳에서 찾아보세요.
          </p>
        </section>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
          <div className='lg:col-span-1'>
            <FilterSidebar />
          </div>
          <div className='lg:col-span-3'>
            <div className='relative mb-6'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='text'
                placeholder='제목, 내용, 작성자 등으로 검색하세요...'
                className='w-full border rounded-lg pl-12 pr-4 py-3 text-lg'
              />
            </div>
            <div className='flex justify-between items-center mb-6'>
              <div className='flex items-center text-sm border rounded-md p-1 bg-white'>
                <button className='px-3 py-1 rounded font-semibold bg-gray-100 shadow-sm'>
                  최신순
                </button>
                <button className='px-3 py-1 rounded text-gray-500 hover:bg-gray-100'>
                  인기순
                </button>
              </div>
              <Link
                href='/articles/new'
                className='flex items-center bg-indigo-600 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-indigo-700'
              >
                <PlusCircle size={16} className='mr-2' /> 새 아티클 작성
              </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {allArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className='flex justify-center mt-12'>
              <div className='text-gray-500'>[ 페이지네이션 컴포넌트 ]</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
