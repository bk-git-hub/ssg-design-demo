'use client';
import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { PlusCircle, Award, UserPlus, Search, X } from 'lucide-react';
import { useState } from 'react';

function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- 가상 데이터 ---
const allMembers = [
  { id: 1, name: '김민준', profileImageUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: '이수진', profileImageUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: '박보안', profileImageUrl: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: '최고수', profileImageUrl: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: '정데이터', profileImageUrl: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: '강신입', profileImageUrl: 'https://i.pravatar.cc/150?u=6' },
];
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
const mockMembers = [
  { id: 1, name: '김민준', profileImageUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: '이수진', profileImageUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: '박보안', profileImageUrl: 'https://i.pravatar.cc/150?u=3' },
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

export default function AdminCommunityPage() {
  const tabs = ['뱃지 관리', '뱃지 부여'];
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedBadge, setSelectedBadge] = useState<any>(mockBadges[0]);
  const [selectedMembers, setSelectedMembers] = useState([allMembers[0]]);

  const toggleMember = (member: any) => {
    if (selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

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
            <AdminTable headers={['이름', '설명', '획득자 수', '관리']}>
              {mockBadges.map((badge) => (
                <tr key={badge.id} className='bg-white border-b'>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {badge.name}
                  </td>
                  <td className='px-6 py-4'>{badge.description}</td>
                  <td className='px-6 py-4'>
                    <Link
                      href={`/admin/community/badges/earners/${badge.id}`}
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

          {/* ✨ UX가 개선된 '뱃지 부여' 탭 ✨ */}
          <Tab.Panel className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-bold mb-4'>뱃지 다중 부여</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* --- 왼쪽: 뱃지 선택 및 최종 확인 --- */}
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    뱃지 선택
                  </label>
                  <select className='w-full border rounded-md p-2'>
                    {mockBadges.map((badge) => (
                      <option key={badge.id} value={badge.id}>
                        {badge.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    선택된 멤버 ({selectedMembers.length})
                  </label>
                  <div className='border rounded-md p-2 min-h-[100px] space-y-2'>
                    {selectedMembers.map((member) => (
                      <div
                        key={member.id}
                        className='flex items-center justify-between bg-gray-100 px-2 py-1 rounded'
                      >
                        <div className='flex items-center'>
                          <img
                            src={member.profileImageUrl}
                            className='w-6 h-6 rounded-full mr-2'
                          />
                          <span className='text-sm font-medium'>
                            {member.name}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleMember(member)}
                          className='text-gray-400 hover:text-red-500'
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='pt-4 border-t'>
                  <button className='w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700'>
                    <Award size={16} className='mr-2' /> 총{' '}
                    {selectedMembers.length}명에게 뱃지 부여하기
                  </button>
                </div>
              </div>

              {/* --- 오른쪽: 멤버 검색 및 선택 --- */}
              <div>
                <div className='relative mb-2'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                  <input
                    type='text'
                    placeholder='이름으로 검색...'
                    className='w-full border rounded-md p-2 pl-9'
                  />
                </div>
                <div className='border rounded-md max-h-80 overflow-y-auto'>
                  {allMembers.map((member) => (
                    <label
                      key={member.id}
                      className='flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0'
                    >
                      <input
                        type='checkbox'
                        className='h-4 w-4 rounded'
                        checked={
                          !!selectedMembers.find((m) => m.id === member.id)
                        }
                        onChange={() => toggleMember(member)}
                      />
                      <img
                        src={member.profileImageUrl}
                        className='w-8 h-8 rounded-full mx-3'
                      />
                      <span className='text-sm font-medium text-gray-800'>
                        {member.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
