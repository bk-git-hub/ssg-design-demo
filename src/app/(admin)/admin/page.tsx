import {
  Users,
  FileText,
  BarChart3,
  Star,
  ArrowRightCircle,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

// --- UI 컴포넌트 ---
const StatCard = ({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) => (
  <div className='bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg'>
    <div className='flex items-start justify-between'>
      <div>
        <p className='text-sm font-medium text-gray-500'>{title}</p>
        <p className='text-3xl font-bold mt-1'>{value}</p>
      </div>
      <div className='bg-indigo-100 text-indigo-600 p-3 rounded-full'>
        {icon}
      </div>
    </div>
    <p className='text-xs text-green-600 mt-2'>{change}</p>
  </div>
);

// ✨ 방문자 수 그래프 컴포넌트 ✨
const VisitorsChart = () => {
  // 7일간의 방문자 수를 나타내는 가상 데이터
  const weeklyVisitors = [
    { day: '월', count: 120 },
    { day: '화', count: 180 },
    { day: '수', count: 150 },
    { day: '목', count: 220 },
    { day: '금', count: 250 },
    { day: '토', count: 310 },
    { day: '일', count: 280 },
  ];
  const maxVisitors = Math.max(...weeklyVisitors.map((v) => v.count));

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='font-bold mb-4 flex items-center'>
        <TrendingUp size={18} className='mr-2' />
        주간 방문자 수
      </h2>
      <div className='flex justify-around items-end h-48 border-l border-b border-gray-200 p-2'>
        {weeklyVisitors.map((data) => (
          <div key={data.day} className='flex flex-col items-center w-full'>
            <div
              className='w-1/2 bg-indigo-500 rounded-t-sm hover:bg-indigo-700'
              style={{ height: `${(data.count / maxVisitors) * 100}%` }}
            ></div>
            <span className='text-xs font-semibold mt-2'>{data.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AdminDashboardPage() {
  // 가상 데이터
  const popularPosts = [
    {
      id: 1,
      type: '아티클',
      title: 'CSRF 토큰은 어떻게 동작하는가?',
      stat: '조회수 1,204',
    },
    {
      id: 2,
      type: '프로젝트',
      title: 'XSS 패턴 자동 탐지 스캐너',
      stat: '좋아요 128',
    },
    {
      id: 3,
      type: '아티클',
      title: 'PE 파일 구조 완전 정복',
      stat: '조회수 980',
    },
  ];

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>대시보드</h1>

      {/* --- 요약 정보 카드 --- */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard
          title='페이지 총 방문'
          value='8,452 회'
          change='+15% (지난 주 대비)'
          icon={<BarChart3 />}
        />
        <StatCard
          title='신규 가입 (7일)'
          value='12 명'
          change='+5% (지난 주 대비)'
          icon={<Users />}
        />
        <StatCard
          title='새 프로젝트 (7일)'
          value='3 개'
          change='-25% (지난 주 대비)'
          icon={<FileText />}
        />
        <StatCard
          title='새 아티클 (7일)'
          value='8 개'
          change='+30% (지난 주 대비)'
          icon={<FileText />}
        />
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
        {/* --- 메인 콘텐츠 (그래프 및 주요 바로가기) --- */}
        <div className='xl:col-span-2 space-y-8'>
          <VisitorsChart />
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='font-bold mb-4'>최근 인기 게시물</h2>
            <ul>
              {popularPosts.map((post) => (
                <li
                  key={post.id}
                  className='border-b last:border-b-0 py-2 flex justify-between items-center'
                >
                  <div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full mr-2 ${
                        post.type === '프로젝트'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {post.type}
                    </span>
                    <span className='font-medium text-gray-800'>
                      {post.title}
                    </span>
                  </div>
                  <span className='text-gray-500 text-sm'>{post.stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- 사이드 액션 패널 --- */}
        <div className='xl:col-span-1 space-y-8'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='font-bold mb-4'>정회원 승인 관리</h2>
            <div className='text-center'>
              <p className='text-5xl font-extrabold text-indigo-600'>5</p>
              <p className='text-gray-500 mb-4'>
                명의 회원이 승인을 기다리고 있습니다.
              </p>
              <Link
                href='/admin/users'
                className='w-full inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700'
              >
                회원 관리 페이지로 이동
              </Link>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='font-bold mb-4'>빠른 링크</h2>
            <div className='space-y-2'>
              <Link
                href='/admin/content'
                className='block text-indigo-600 hover:underline'
              >
                콘텐츠 관리
              </Link>
              <Link
                href='/admin/community'
                className='block text-indigo-600 hover:underline'
              >
                커뮤니티 관리
              </Link>
              <Link
                href='/projects/new'
                className='block text-indigo-600 hover:underline'
              >
                새 프로젝트 만들기
              </Link>
              <Link
                href='/articles/new'
                className='block text-indigo-600 hover:underline'
              >
                새 아티클 작성하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
