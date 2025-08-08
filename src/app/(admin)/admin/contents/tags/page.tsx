'use client';
import { Save, Tag } from 'lucide-react';

export default function EditTagPage() {
  const tag = {
    name: 'React',
    description: '사용자 인터페이스를 만들기 위한 JavaScript 라이브러리',
  };

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>태그 수정: #{tag.name}</h1>
      <div className='bg-white p-6 rounded-lg shadow max-w-2xl space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            태그 이름
          </label>
          <div className='relative mt-1'>
            <Tag className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type='text'
              defaultValue={tag.name}
              className='w-full border rounded-lg pl-9 pr-4 py-2'
            />
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            설명 (선택)
          </label>
          <textarea
            rows={3}
            defaultValue={tag.description}
            className='mt-1 w-full border rounded-lg p-2'
          ></textarea>
        </div>
        <div className='flex justify-end border-t pt-4'>
          <button className='flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700'>
            <Save size={16} className='mr-2' /> 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
