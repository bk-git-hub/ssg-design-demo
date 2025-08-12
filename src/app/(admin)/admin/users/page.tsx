'use client';
import { useState, Fragment } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { Search, PlusCircle, Edit, Trash2, Check, X } from 'lucide-react';
import Link from 'next/link';

function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminUsersPage() {
  // --- 가상 데이터 (확장됨) ---
  const pendingUsers = [
    {
      id: 4,
      name: '김신입',
      email: 'new@email.com',
      requestedAt: '2025-08-10',
      requestedTitle: '24기',
    },
    {
      id: 5,
      name: '박새내',
      email: 'park@email.com',
      requestedAt: '2025-08-09',
      requestedTitle: '23기',
    },
    {
      id: 6,
      name: '이준회',
      email: 'lee@email.com',
      requestedAt: '2025-08-09',
      requestedTitle: '졸업생',
    },
    {
      id: 7,
      name: '최외부',
      email: 'choi@email.com',
      requestedAt: '2025-08-08',
      requestedTitle: '신입생',
    },
  ];
  const allUsers = [
    {
      id: 1,
      name: '김민준',
      email: 'a@a.com',
      permission: '운영진',
      title: '회장',
      joinedAt: '2023-03-02',
    },
    {
      id: 2,
      name: '이수진',
      email: 'b@b.com',
      permission: '정회원',
      title: '정회원',
      joinedAt: '2023-09-01',
    },
    {
      id: 3,
      name: '박보안',
      email: 'c@c.com',
      permission: '정회원',
      title: '명예회원',
      joinedAt: '2023-03-02',
    },
    {
      id: 4,
      name: '김신입',
      email: 'd@d.com',
      permission: '준회원',
      title: '준회원',
      joinedAt: '2025-08-10',
    },
    {
      id: 8,
      name: '강멘토',
      email: 'e@e.com',
      permission: '정회원',
      title: '멘토',
      joinedAt: '2024-03-02',
    },
    {
      id: 9,
      name: '정선배',
      email: 'f@f.com',
      permission: '정회원',
      title: '선배',
      joinedAt: '2022-09-01',
    },
  ];
  const userTitles = [
    { id: 1, name: '회장', permission: '운영진' },
    { id: 2, name: '부회장', permission: '운영진' },
    { id: 3, name: '정회원', permission: '정회원' },
    { id: 4, name: '준회원', permission: '준회원' },
    { id: 5, name: '명예회원', permission: '정회원' },
    { id: 6, name: '멘토', permission: '정회원' },
  ];

  const [isCreating, setIsCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const openModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

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

  const tabs = ['등급 변경 요청', '전체 회원', '등급 관리'];

  return (
    <div className='space-y-12'>
      <h1 className='text-3xl font-bold'>회원 관리</h1>
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
            <h2 className='text-xl font-bold mb-4'>
              등급 변경 요청 목록 ({pendingUsers.length})
            </h2>
            <AdminTable
              headers={['이름', '이메일', '신청 등급', '신청일', '관리']}
            >
              {pendingUsers.map((user) => (
                <tr key={user.id} className='bg-white border-b'>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {user.name}
                  </td>
                  <td className='px-6 py-4'>{user.email}</td>
                  <td className='px-6 py-4 font-semibold text-indigo-600'>
                    {user.requestedTitle}
                  </td>
                  <td className='px-6 py-4'>{user.requestedAt}</td>
                  <td className='px-6 py-4 flex space-x-3'>
                    <button className='text-green-500 hover:text-green-700 font-semibold'>
                      승인
                    </button>
                    <button className='text-red-500 hover:text-red-700 font-semibold'>
                      거절
                    </button>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Tab.Panel>
          <Tab.Panel className='bg-white p-6 rounded-lg shadow'>
            <div className='flex flex-wrap items-center justify-between mb-4 gap-4'>
              <div className='flex items-center space-x-2'>
                <select className='border rounded-lg py-2 px-3 text-sm'>
                  <option>정렬: 가입일순</option>
                  <option>정렬: 등급순</option>
                  <option>정렬: 이름순</option>
                </select>
              </div>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='이름으로 검색'
                  className='border rounded-lg pl-10 pr-4 py-2'
                />
              </div>
            </div>
            <AdminTable
              headers={['이름', '권한', '등급명 (수정)', '가입일', '관리']}
            >
              {allUsers.map((user) => (
                <tr key={user.id} className='bg-white border-b'>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {user.name}
                  </td>
                  <td className='px-6 py-4'>{user.permission}</td>
                  <td className='px-6 py-4'>
                    <select
                      defaultValue={user.title}
                      className='border rounded-md p-1'
                    >
                      <option>{user.title}</option>
                    </select>
                  </td>
                  <td className='px-6 py-4'>{user.joinedAt}</td>
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => openModal(user)}
                      className='font-medium text-indigo-600 hover:underline'
                    >
                      적용
                    </button>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Tab.Panel>
          <Tab.Panel className='bg-white p-6 rounded-lg shadow'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>회원 등급 관리</h2>
              <button
                onClick={() => setIsCreating(true)}
                className='flex items-center bg-indigo-600 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-indigo-700'
              >
                <PlusCircle size={16} className='mr-2' /> 새 등급 만들기
              </button>
            </div>
            <AdminTable headers={['등급명', '기반 권한', '관리']}>
              {isCreating && (
                <tr className='bg-indigo-50'>
                  <td className='px-6 py-4'>
                    <input
                      type='text'
                      placeholder='새 등급명'
                      className='w-full border rounded p-1'
                    />
                  </td>
                  <td className='px-6 py-4'>
                    <select className='w-full border rounded p-1'>
                      <option>운영진</option>
                      <option>정회원</option>
                      <option>준회원</option>
                    </select>
                  </td>
                  <td className='px-6 py-4 flex space-x-2'>
                    <button
                      onClick={() => setIsCreating(false)}
                      className='text-green-500 hover:text-green-700'
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => setIsCreating(false)}
                      className='text-red-500 hover:text-red-700'
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              )}
              {userTitles.map((title) => (
                <tr key={title.id} className='bg-white border-b'>
                  <td className='px-6 py-4 font-medium text-gray-900'>
                    {title.name}
                  </td>
                  <td className='px-6 py-4'>{title.permission}</td>
                  <td className='px-6 py-4 flex space-x-2'>
                    <button className='text-gray-500 hover:text-indigo-600'>
                      <Edit size={16} />
                    </button>
                    <button className='text-gray-500 hover:text-red-500'>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </AdminTable>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-bold leading-6 text-gray-900'
                  >
                    등급 변경 확인
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      정말로{' '}
                      <span className='font-bold'>{selectedUser?.name}</span>{' '}
                      회원의 등급을 변경하시겠습니까?
                    </p>
                  </div>
                  <div className='mt-4 flex justify-end space-x-2'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                      onClick={closeModal}
                    >
                      취소
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
                      onClick={closeModal}
                    >
                      확인
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
