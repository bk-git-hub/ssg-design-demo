import { Users, FileText, MessageSquare, Badge } from 'lucide-react';
import Link from 'next/link';

// --- UI 컴포넌트 ---
const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className='bg-white p-6 rounded-lg shadow'>
    <div className='flex items-center'>
      <div className='bg-indigo-100 text-indigo-600 p-3 rounded-full'>
        {icon}
      </div>
      <div className='ml-4'>
        <p className='text-sm text-gray-500'>{title}</p>
        <p className='text-2xl font-bold'>{value}</p>
      </div>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  return (
    // AdminLayout에 의해 감싸져 있으므로, 여기서는 메인 콘텐츠만 작성합니다.
    <div>
      <h1 className='text-3xl font-bold mb-8'>대시보드</h1>

      {/* --- 요약 정보 카드 --- */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard title='정회원 승인 대기' value='5 명' icon={<Users />} />
        <StatCard
          title='새 아티클 (최근 7일)'
          value='12 개'
          icon={<FileText />}
        />
        <StatCard
          title='새 Q&A (최근 7일)'
          value='8 개'
          icon={<MessageSquare />}
        />
        <StatCard title='총 뱃지 종류' value='7 개' icon={<Badge />} />
      </div>

      {/* --- 최근 활동 목록 --- */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='font-bold mb-4'>최근 가입한 회원 (승인 대기)</h2>
          {/* 실제로는 데이터를 받아와서 목록을 생성합니다. */}
          <ul>
            <li className='border-b last:border-b-0 py-2 flex justify-between items-center'>
              <span>김신입 (24학번)</span>
              <Link
                href='/admin/users'
                className='text-indigo-600 text-sm font-semibold hover:underline'
              >
                승인하기
              </Link>
            </li>
            <li className='border-b last:border-b-0 py-2 flex justify-between items-center'>
              <span>박새내 (24학번)</span>
              <Link
                href='/admin/users'
                className='text-indigo-600 text-sm font-semibold hover:underline'
              >
                승인하기
              </Link>
            </li>
            <li className='py-2 flex justify-between items-center'>
              <span>이준회 (23학번)</span>
              <Link
                href='/admin/users'
                className='text-indigo-600 text-sm font-semibold hover:underline'
              >
                승인하기
              </Link>
            </li>
          </ul>
        </div>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='font-bold mb-4'>최근 작성된 아티클</h2>
          {/* 실제로는 데이터를 받아와서 목록을 생성합니다. */}
          <ul>
            <li className='border-b last:border-b-0 py-2 flex justify-between items-center'>
              <span>CSRF 토큰은 어떻게 동작하는가?</span>
              <span className='text-gray-500 text-sm'>by 이수진</span>
            </li>
            <li className='border-b last:border-b-0 py-2 flex justify-between items-center'>
              <span>XSS 공격의 모든 것</span>
              <span className='text-gray-500 text-sm'>by 박보안</span>
            </li>
            <li className='py-2 flex justify-between items-center'>
              <span>PE 파일 구조 완전 정복</span>
              <span className='text-gray-500 text-sm'>by 최고수</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
