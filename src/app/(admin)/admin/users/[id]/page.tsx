'use client';

import { Save } from 'lucide-react';

export default function EditUserPage() {
  // 실제로는 params.id를 이용해 유저 정보를 불러옴
  const user = {
    name: '김신입',
    email: 'newbie@email.com',
    role: '준회원',
  };

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>회원 정보 수정</h1>
      <div className='bg-white p-6 rounded-lg shadow max-w-2xl'>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              이름
            </label>
            <input
              type='text'
              disabled
              value={user.name}
              className='mt-1 block w-full border rounded-md p-2 bg-gray-100'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              이메일
            </label>
            <input
              type='email'
              disabled
              value={user.email}
              className='mt-1 block w-full border rounded-md p-2 bg-gray-100'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              회원 등급
            </label>
            <select
              defaultValue={user.role}
              className='mt-1 block w-full border rounded-md p-2'
            >
              <option>준회원</option>
              <option>정회원</option>
              <option>선배</option>
              <option>운영진</option>
            </select>
          </div>
        </div>
        <div className='flex justify-end border-t pt-4 mt-6'>
          <button className='flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700'>
            <Save size={16} className='mr-2' /> 변경사항 저장
          </button>
        </div>
      </div>
    </div>
  );
}
