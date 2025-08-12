import Link from 'next/link';
import { Users } from 'lucide-react';

// --- 가상 데이터 ---
const badgeInfo = {
  id: 1,
  name: '이달의 기여자',
};
const earners = [
  {
    id: 1,
    name: '김민준',
    profileImageUrl: 'https://i.pravatar.cc/150?u=1',
    earnedAt: '2025-07-31',
  },
  {
    id: 2,
    name: '이수진',
    profileImageUrl: 'https://i.pravatar.cc/150?u=2',
    earnedAt: '2025-06-30',
  },
  {
    id: 3,
    name: '박보안',
    profileImageUrl: 'https://i.pravatar.cc/150?u=3',
    earnedAt: '2025-06-30',
  },
  {
    id: 4,
    name: '최고수',
    profileImageUrl: 'https://i.pravatar.cc/150?u=4',
    earnedAt: '2025-05-31',
  },
  {
    id: 5,
    name: '정데이터',
    profileImageUrl: 'https://i.pravatar.cc/150?u=5',
    earnedAt: '2025-04-30',
  },
];

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

export default function BadgeEarnersPage() {
  // 실제로는 params.badgeId를 이용해 데이터를 불러옵니다.

  return (
    <div>
      <div className='mb-8'>
        <Link
          href='/admin/community'
          className='text-sm text-indigo-600 hover:underline'
        >
          &larr; 커뮤니티 관리로 돌아가기
        </Link>
        <h1 className='text-3xl font-bold mt-2'>
          '{badgeInfo.name}' 뱃지 획득자 목록
        </h1>
        <p className='text-gray-600'>
          총 {earners.length}명의 멤버가 이 뱃지를 획득했습니다.
        </p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow'>
        <AdminTable headers={['멤버', '획득일', '관리']}>
          {earners.map((earner) => (
            <tr key={earner.id} className='bg-white border-b'>
              <td className='px-6 py-4'>
                <div className='flex items-center'>
                  <img
                    src={earner.profileImageUrl}
                    alt={earner.name}
                    className='w-8 h-8 rounded-full mr-3'
                  />
                  <span className='font-medium text-gray-900'>
                    {earner.name}
                  </span>
                </div>
              </td>
              <td className='px-6 py-4'>{earner.earnedAt}</td>
              <td className='px-6 py-4'>
                <a
                  href='#'
                  className='font-medium text-red-600 hover:underline'
                >
                  뱃지 회수
                </a>
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}
