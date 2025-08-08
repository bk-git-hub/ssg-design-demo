'use client';
import { Tab } from '@headlessui/react';
import { Award, UserPlus } from 'lucide-react';

function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

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
            <h2 className='font-bold mb-4'>뱃지 종류 관리</h2>
            <p>시스템에서 사용할 뱃지를 생성, 수정, 삭제합니다.</p>
            {/* 뱃지 관리 UI (예: 뱃지 목록, +새 뱃지 만들기 버튼) */}
          </Tab.Panel>
          <Tab.Panel className='bg-white p-6 rounded-lg shadow'>
            <h2 className='font-bold mb-4'>뱃지 수동 부여</h2>
            <p>
              특정 멤버에게 뱃지를 수동으로 부여할 수 있습니다. (예: 이달의
              멤버)
            </p>
            <div className='mt-4 space-y-4'>
              <div>
                <label className='block text-sm font-medium'>멤버 선택</label>
                <input
                  type='text'
                  placeholder='이름으로 검색...'
                  className='w-full md:w-1/2 border rounded-md p-2 mt-1'
                />
              </div>
              <div>
                <label className='block text-sm font-medium'>뱃지 선택</label>
                <select className='w-full md:w-1/2 border rounded-md p-2 mt-1'>
                  <option>이달의 멤버</option>
                  <option>명예 졸업생</option>
                </select>
              </div>
              <button className='bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700'>
                부여하기
              </button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
