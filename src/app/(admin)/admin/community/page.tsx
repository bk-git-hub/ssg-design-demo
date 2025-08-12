'use client';
import { Tab } from '@headlessui/react';
import Link from 'next/link'; // Link 컴포넌트 추가
import { PlusCircle, Award, UserPlus, Search } from 'lucide-react';

function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- 가상 데이터 (earnerCount 추가) ---
const mockBadges = [
  {
    id: 1,
    name: '이달의 기여자',
    description:
      '한 달간 가장 많은 아티클을 작성하거나 우수 답변을 채택받은 멤버에게 수여됩니다.',
    earnerCount: 5,
  },
  {
    id: 2,
    name: '명예의 전당 아티클',
    description: '운영진이 인정한 우수 아티클을 작성한 멤버에게 수여됩니다.',
    earnerCount: 12,
  },
  {
    id: 3,
    name: 'Q&A 해결사',
    description:
      'Q&A 게시판에서 10개 이상의 답변이 채택된 멤버에게 수여됩니다.',
    earnerCount: 8,
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

export default function AdminCommunityPage() {
  const tabs = ['뱃지 관리', '뱃지 부여'];

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>커뮤니티 관리</h1>
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
              <h2 className='text-xl font-bold'>뱃지 종류 관리</h2>
              <Link
                href='/admin/community/badges/new'
                className='flex items-center bg-indigo-600 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-indigo-700'
              >
                <PlusCircle size={16} className='mr-2' /> 새 뱃지 만들기
              </Link>
            </div>
            {/* ✨ '획득자 수' 컬럼 추가 ✨ */}
            <AdminTable headers={['이름', '설명', '획득자 수', '관리']}>
              {mockBadges.map((badge) => (
                <tr key={badge.id} className='bg-white border-b'>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {badge.name}
                  </td>
                  <td className='px-6 py-4'>{badge.description}</td>
                  <td className='px-6 py-4'>
                    {/* ✨ 클릭 가능한 링크로 변경 ✨ */}
                    <Link
                      href={`/admin/community/badges/${badge.id}`}
                      className='font-medium text-indigo-600 hover:underline'
                    >
                      {badge.earnerCount} 명
                    </Link>
                  </td>
                  <td className='px-6 py-4'>
                    <Link
                      href={`/admin/community/badges/edit/${badge.id}`}
                      className='font-medium text-indigo-600 hover:underline'
                    >
                      수정
                    </Link>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Tab.Panel>
          <Tab.Panel className='bg-white p-6 rounded-lg shadow'>
            {/* ... 뱃지 부여 탭 내용 ... */}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
