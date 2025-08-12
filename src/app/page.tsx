import Link from 'next/link';
import { ArrowLeft, ArrowRight, Target, FileText } from 'lucide-react';
import Header from '@/components/layout/Header';

// --- 가상 데이터 ---
// ✨ categories 데이터에 imageUrl 추가 ✨
const categories = [
  {
    name: '웹 해킹',
    slug: 'web-hacking',
    description: '웹 애플리케이션의 취약점을 분석합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80',
    projectCount: 5,
    articleCount: 12,
  },
  {
    name: '리버싱',
    slug: 'reversing',
    description: '소프트웨어를 역으로 분석하여 구조를 파악합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80',
    projectCount: 3,
    articleCount: 8,
  },
  {
    name: '시스템 해킹',
    slug: 'system-hacking',
    description: '운영체제와 시스템의 취약점을 공격합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
    projectCount: 2,
    articleCount: 5,
  },
  {
    name: '디지털 포렌식',
    slug: 'digital-forensics',
    description: '디지털 증거를 수집하고 분석하는 기술을 배웁니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80',
    projectCount: 4,
    articleCount: 9,
  },
  {
    name: '네트워크 보안',
    slug: 'network-security',
    description: '네트워크를 보호하기 위한 기술과 정책을 연구합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&q=80',
    projectCount: 3,
    articleCount: 11,
  },
  {
    name: '악성코드 분석',
    slug: 'malware-analysis',
    description: '악성코드의 동작 방식을 분석하고 대응합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1544890225-2f3faec4ba60?w=500&q=80',
    projectCount: 2,
    articleCount: 7,
  },
  {
    name: '암호학',
    slug: 'cryptography',
    description: '정보를 보호하기 위한 암호 기술의 원리를 배웁니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1584379924564-446753a429b9?w=500&q=80',
    projectCount: 1,
    articleCount: 6,
  },
  {
    name: '모바일 해킹',
    slug: 'mobile-hacking',
    description: '모바일 환경의 보안 취약점을 연구합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1580974928073-a7719b4b6a88?w=500&q=80',
    projectCount: 2,
    articleCount: 4,
  },
  {
    name: '보안 관제',
    slug: 'security-operations',
    description: '보안 시스템을 모니터링하고 위협에 대응합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1526379879527-35d21c23a73c?w=500&q=80',
    projectCount: 1,
    articleCount: 5,
  },
  {
    name: '자료구조/알고리즘',
    slug: 'algorithms',
    description: '문제 해결을 위한 프로그래밍의 기초를 다집니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
    projectCount: 0,
    articleCount: 18,
  },
  {
    name: '운영체제',
    slug: 'operating-systems',
    description: '컴퓨터 시스템의 동작 원리를 깊이 있게 이해합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1618334464377-3aeac235f21f?w=500&q=80',
    projectCount: 0,
    articleCount: 10,
  },
  {
    name: 'CTF',
    slug: 'ctf',
    description: '모의 해킹 대회(Capture The Flag)에 참여합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=80',
    projectCount: 10,
    articleCount: 25,
  },
  {
    name: '개발 문화 & 커리어',
    slug: 'dev-culture',
    description: '개발자의 성장과 협업에 대해 논의합니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    projectCount: 0,
    articleCount: 15,
  },
];

// ✨ 콘텐츠 피드를 위해 아티클과 프로젝트 예시 데이터를 각각 3개 이상으로 늘림 ✨
const latestArticles = [
  {
    id: 1,
    title: 'CSRF 토큰은 어떻게 동작하는가?',
    author: '이수진',
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80',
  },
  {
    id: 2,
    title: "Dreamhack 'Simple Board' 문제 풀이",
    author: '김민준',
    imageUrl:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
  },
  {
    id: 3,
    title: 'Log4j 취약점, 2년이 지난 지금은?',
    author: '박준형',
    imageUrl:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80',
  },
];
const latestProjects = [
  {
    id: 1,
    title: 'XSS 패턴 자동 탐지 스캐너 개발',
    category: '웹 해킹',
    imageUrl:
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&q=80',
  },
  {
    id: 2,
    title: '교내 도서관 시스템 로그인 우회 취약점 분석',
    category: '웹 해킹',
    imageUrl:
      'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=400&q=80',
  },
  {
    id: 3,
    title: '안드로이드 악성 앱 정적 분석 보고서',
    category: '리버싱',
    imageUrl:
      'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400&q=80',
  },
];

// --- UI 컴포넌트 ---
// ✨ 캐러셀 카드를 썸네일이 포함된 형태로 변경 ✨
const CategoryCard = ({ category }: { category: (typeof categories)[0] }) => (
  <Link
    href={`/categories/${category.slug}`}
    className='block flex-shrink-0 w-64 rounded-lg overflow-hidden group hover:shadow-xl transition-all border'
  >
    <div className='overflow-hidden h-32 relative'>
      <img
        src={category.imageUrl}
        alt={category.name}
        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
      />
      <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
        <h3 className='font-bold text-xl text-white text-center'>
          {category.name}
        </h3>
      </div>
    </div>

    <div className='p-3 bg-white'>
      <p className='text-sm text-gray-600 h-10'>{category.description}</p>
    </div>
    <div className='border-t mt-2 p-3 text-xs text-gray-500 flex justify-between items-center bg-gray-50 rounded-b-lg'>
      <span>📂 프로젝트 {category.projectCount}개</span>
      <span>📝 아티클 {category.articleCount}개</span>
    </div>
  </Link>
);

const ContentCard = ({
  title,
  imageUrl,
  subtitle,
}: {
  title: string;
  imageUrl: string;
  subtitle: string;
}) => (
  <Link
    href='#'
    className='block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group'
  >
    <div className='overflow-hidden h-40'>
      <img
        src={imageUrl}
        alt={title}
        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
      />
    </div>
    <div className='p-4 bg-white'>
      <p className='text-sm font-semibold text-indigo-600 mb-1'>{subtitle}</p>
      <h3 className='font-semibold text-gray-800 h-12 truncate'>{title}</h3>
    </div>
  </Link>
);

export default function HubLandingPage() {
  return (
    <div className='bg-white min-h-screen'>
      <Header />
      <main className='container mx-auto px-4 py-12'>
        <section className='text-center mb-16'>
          <h1 className='text-5xl font-extrabold mb-4'>SSG 지식 허브</h1>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            동아리의 모든 지식과 경험이 이곳에 축적됩니다. 원하는 학습 분야를
            선택하여 탐색을 시작하세요.
          </p>
        </section>

        <section className='mb-20'>
          <h2 className='text-2xl font-bold mb-6'>학습 카테고리 둘러보기</h2>
          <div className='flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide'>
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </section>

        {/* --- ✨ 동적 콘텐츠 피드 (3열 그리드, 2줄) ✨ --- */}
        <section>
          <div className='space-y-12'>
            {/* 최신 아티클 */}
            <div>
              <div className='flex items-center mb-4'>
                <FileText className='w-6 h-6 text-gray-700' />
                <h2 className='text-2xl font-bold ml-3'>최신 글</h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {latestArticles.map((article) => (
                  <ContentCard
                    key={article.id}
                    title={article.title}
                    imageUrl={article.imageUrl}
                    subtitle={`by ${article.author}`}
                  />
                ))}
              </div>
            </div>

            {/* 최신 프로젝트 */}
            <div>
              <div className='flex items-center mb-4'>
                <Target className='w-6 h-6 text-gray-700' />
                <h2 className='text-2xl font-bold ml-3'>최신 프로젝트</h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {latestProjects.map((project) => (
                  <ContentCard
                    key={project.id}
                    title={project.title}
                    imageUrl={project.imageUrl}
                    subtitle={project.category}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
