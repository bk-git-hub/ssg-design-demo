'use client'; // 탭 상태 관리를 위해 클라이언트 컴포넌트로 선언

import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { notFound, useParams } from 'next/navigation';
import { PlusCircle, ArrowRight } from 'lucide-react';

// --- Helper Function ---
function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- 가상 데이터베이스 (모든 카테고리 상세 데이터 포함) ---
const allCategoryData = [
  {
    name: '웹 해킹',
    slug: 'web-hacking',
    introduction:
      '웹 애플리케이션의 취약점을 분석하고 공격 기법을 연구하여, 안전한 웹 환경을 구축하는 방법을 배우는 분야입니다.',
    projects: [
      {
        id: 1,
        title: 'XSS 패턴 자동 탐지 스캐너 개발',
        imageUrl:
          'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&q=80',
      },
      {
        id: 2,
        title: '교내 도서관 시스템 로그인 우회 취약점 분석',
        imageUrl:
          'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=500&q=80',
      },
    ],
    articles: [
      {
        id: 1,
        title: 'CSRF 토큰은 어떻게 동작하는가? 상세 분석',
        author: '이수진',
        imageUrl:
          'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80',
      },
      {
        id: 2,
        title: "Dreamhack 'Simple Board' 문제 풀이 (Write-up)",
        author: '김민준',
        imageUrl:
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80',
      },
      {
        id: 3,
        title: '보안 뉴스: Log4j 취약점, 2년이 지난 지금은?',
        author: '박준형',
        imageUrl:
          'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&q=80',
      },
    ],
  },
  {
    name: '리버싱',
    slug: 'reversing',
    introduction:
      '컴파일된 프로그램을 역으로 분석하여 소스 코드의 구조와 동작 원리를 파악하는 기술입니다.',
    projects: [
      {
        id: 3,
        title: '간단한 악성코드 분석 보고서',
        imageUrl:
          'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=500&q=80',
      },
    ],
    articles: [
      {
        id: 4,
        title: 'PE 파일 구조 완전 정복',
        author: '박보안',
        imageUrl:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
      },
      {
        id: 5,
        title: 'IDA Pro 기본 사용법 가이드',
        author: '최고수',
        imageUrl:
          'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80',
      },
    ],
  },
  {
    name: '시스템 해킹',
    slug: 'system-hacking',
    introduction:
      '운영체제나 시스템 소프트웨어의 취약점을 이용하여 시스템의 권한을 획득하는 기술을 연구합니다.',
    projects: [],
    articles: [
      {
        id: 7,
        title: '버퍼 오버플로우 공격의 원리와 실제',
        author: '박보안',
        imageUrl:
          'https://images.unsplash.com/photo-1614741118884-62ac14371513?w=500&q=80',
      },
      {
        id: 8,
        title: '리눅스 커널 익스플로잇 기초',
        author: '최고수',
        imageUrl:
          'https://images.unsplash.com/photo-1618334464377-3aeac235f21f?w=500&q=80',
      },
    ],
  },
  {
    name: '디지털 포렌식',
    slug: 'digital-forensics',
    introduction:
      '디지털 기기에 남아있는 증거를 수집, 분석하여 범죄 사실을 증명하거나 사건의 전말을 밝혀내는 기술입니다.',
    projects: [
      {
        id: 4,
        title: '삭제된 파일 복구 프로젝트',
        imageUrl:
          'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=500&q=80',
      },
    ],
    articles: [
      {
        id: 6,
        title: '메모리 포렌식 기초: Volatility 사용법',
        author: '정데이터',
        imageUrl:
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80',
      },
    ],
  },
  {
    name: '네트워크 보안',
    slug: 'network-security',
    introduction:
      '네트워크를 통해 발생하는 위협으로부터 시스템을 보호하기 위한 기술과 정책을 연구합니다.',
    projects: [],
    articles: [
      {
        id: 11,
        title: 'Wireshark를 이용한 패킷 분석 기초',
        author: '김민준',
        imageUrl:
          'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&q=80',
      },
    ],
  },
  {
    name: '악성코드 분석',
    slug: 'malware-analysis',
    introduction:
      '악성코드의 동작 방식을 정적/동적으로 분석하여 그 목적과 피해를 파악하고 대응 방안을 수립합니다.',
    projects: [],
    articles: [
      {
        id: 12,
        title: '랜섬웨어 동작 방식 분석',
        author: '박보안',
        imageUrl:
          'https://images.unsplash.com/photo-1544890225-2f3faec4ba60?w=500&q=80',
      },
    ],
  },
  {
    name: '암호학',
    slug: 'cryptography',
    introduction:
      '데이터를 안전하게 보호하기 위한 암호화, 복호화 알고리즘과 수학적 원리를 탐구하는 분야입니다.',
    projects: [],
    articles: [
      {
        id: 9,
        title: 'RSA 공개키 암호 알고리즘 이해하기',
        author: '이수진',
        imageUrl:
          'https://images.unsplash.com/photo-1584379924564-446753a429b9?w=500&q=80',
      },
    ],
  },
  {
    name: '모바일 해킹',
    slug: 'mobile-hacking',
    introduction:
      '모바일 환경의 특수성을 이해하고, 안드로이드 및 iOS 앱의 보안 취약점을 분석합니다.',
    projects: [],
    articles: [],
  },
  {
    name: '보안 관제',
    slug: 'security-operations',
    introduction:
      '보안 시스템을 24시간 모니터링하고, 발생하는 위협에 실시간으로 대응하는 방법을 학습합니다.',
    projects: [],
    articles: [],
  },
  {
    name: '자료구조/알고리즘',
    slug: 'algorithms',
    introduction:
      '효율적인 문제 해결을 위한 프로그래밍의 기초 체력을 다지는 필수적인 분야입니다.',
    projects: [],
    articles: [],
  },
  {
    name: '운영체제',
    slug: 'operating-systems',
    introduction:
      '컴퓨터 시스템의 동작 원리를 깊이 있게 이해하여 시스템 해킹의 기반을 마련합니다.',
    projects: [],
    articles: [],
  },
  {
    name: 'CTF',
    slug: 'ctf',
    introduction:
      '모의 해킹 대회(Capture The Flag)에 참여하여, 실제와 유사한 환경에서 문제 해결 능력을 기릅니다.',
    projects: [],
    articles: [],
  },
  {
    name: '개발 문화 & 커리어',
    slug: 'dev-culture',
    introduction:
      '훌륭한 개발자가 되기 위한 협업 방식, 성장 습관, 그리고 커리어 로드맵에 대해 함께 고민하고 이야기합니다.',
    projects: [],
    articles: [
      {
        id: 10,
        title: '효과적인 코드 리뷰를 위한 5가지 팁',
        author: '김민준',
        imageUrl:
          'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80',
      },
    ],
  },
  {
    name: '프로젝트',
    slug: 'projects',
    introduction:
      '지금까지 동아리에서 진행된 모든 프로젝트 결과물을 모아볼 수 있습니다.',
    projects: [],
    articles: [],
  },
  {
    name: 'Q&A',
    slug: 'qna',
    introduction:
      '동아리 활동 중 발생하는 모든 궁금증을 질문하고 답변하는 공간입니다.',
    projects: [],
    articles: [],
  },
];

// 사이드바 생성을 위한 데이터 (전체 데이터에서 추출)
const allCategoriesForSidebar = allCategoryData.map((c) => ({
  name: c.name,
  slug: c.slug,
  count: c.projects.length + c.articles.length,
}));

// --- UI 컴포넌트 ---
const ContentCard = ({
  title,
  imageUrl,
  author,
}: {
  title: string;
  imageUrl: string;
  author?: string;
}) => (
  <Link
    href='#'
    className='block border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow'
  >
    <div className='overflow-hidden'>
      <img
        src={imageUrl}
        alt={title}
        className='w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300'
      />
    </div>
    <div className='p-4 bg-white'>
      <h3 className='font-semibold text-gray-800 truncate'>{title}</h3>
      {author && <p className='text-sm text-gray-500 mt-1'>by {author}</p>}
    </div>
  </Link>
);
export default function CategoryDetailPage({}: {}) {
  const params = useParams();
  const currentSlug = params.slug;
  const currentCategoryData = allCategoryData.find(
    (c) => c.slug === currentSlug
  );

  if (!currentCategoryData) {
    notFound();
  }

  const tabs = ['소개', '주요 활동'];

  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* --- 1. 왼쪽 카테고리 사이드바 --- */}
          <aside className='lg:col-span-1'>
            <div className='sticky top-24'>
              <h2 className='text-lg font-bold mb-4 px-3'>전체 카테고리</h2>
              <nav className='flex flex-col space-y-1'>
                {allCategoriesForSidebar.map((category) => (
                  <Link
                    href={`/categories/${category.slug}`}
                    key={category.slug}
                    className={cn(
                      'flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      currentSlug === category.slug
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    <span>{category.name}</span>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs',
                        currentSlug === category.slug
                          ? 'bg-indigo-500'
                          : 'bg-gray-300 text-gray-800'
                      )}
                    >
                      {category.count}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* --- 2. 오른쪽 메인 콘텐츠 --- */}
          <div className='lg:col-span-3'>
            <section className='mb-8'>
              <h1 className='text-4xl font-extrabold mb-2'>
                {currentCategoryData.name}
              </h1>
              <p className='text-md text-gray-600'>
                {currentCategoryData.introduction}
              </p>
            </section>

            <Tab.Group>
              <Tab.List className='border-b border-gray-200'>
                <div className='flex space-x-4'>
                  {tabs.map((tabName) => (
                    <Tab
                      key={tabName}
                      className={({ selected }) =>
                        cn(
                          'px-1 py-2.5 text-md font-semibold leading-5 focus:outline-none',
                          selected
                            ? 'border-b-2 border-indigo-600 text-indigo-600'
                            : 'text-gray-500 hover:text-indigo-600'
                        )
                      }
                    >
                      {tabName}
                    </Tab>
                  ))}
                </div>
              </Tab.List>
              <Tab.Panels className='mt-6'>
                {/* 소개 패널 */}
                <Tab.Panel className='prose max-w-none'>
                  <h3>학습 로드맵</h3>
                  <p>
                    여기에 {currentCategoryData.name} 분야에 대한 상세한 학습
                    로드맵 등이 마크다운 형식으로 표시됩니다.
                  </p>
                </Tab.Panel>

                {/* 주요 활동 패널 */}
                <Tab.Panel className='space-y-12'>
                  {/* 대표 프로젝트 섹션 */}
                  <section>
                    <div className='flex justify-between items-center mb-4'>
                      <h2 className='text-2xl font-bold'>대표 프로젝트</h2>
                      <Link
                        href={`/projects?category=${currentSlug}`}
                        className='flex items-center text-sm font-semibold text-indigo-600 hover:underline'
                      >
                        전체보기 <ArrowRight size={14} className='ml-1' />
                      </Link>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                      {currentCategoryData.projects.slice(0, 3).map((p) => (
                        <ContentCard
                          key={p.id}
                          title={p.title}
                          imageUrl={p.imageUrl}
                        />
                      ))}
                    </div>
                  </section>
                  {/* 대표 아티클 섹션 */}
                  <section>
                    <div className='flex justify-between items-center mb-4'>
                      <h2 className='text-2xl font-bold'>대표 아티클</h2>
                      <Link
                        href={`/articles?category=${currentSlug}`}
                        className='flex items-center text-sm font-semibold text-indigo-600 hover:underline'
                      >
                        전체보기 <ArrowRight size={14} className='ml-1' />
                      </Link>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                      {currentCategoryData.articles.slice(0, 3).map((a) => (
                        <ContentCard
                          key={a.id}
                          title={a.title}
                          imageUrl={a.imageUrl}
                          author={a.author}
                        />
                      ))}
                    </div>
                  </section>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </main>
    </div>
  );
}
