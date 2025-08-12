'use client';
import { Image as ImageIcon, Save } from 'lucide-react';

// ✨ 실제로는 dynamic import를 사용하여 에디터를 불러옵니다.
// import Editor from '@/components/Editor';

export default function EditCategoryPage() {
  // slug가 'new'가 아니면, 기존 데이터를 불러와서 채움
  const category = {
    name: '웹 해킹',
    slug: 'web-hacking',
    introduction: '웹 애플리케이션의 취약점을 분석하고 공격 기법을 연구합니다.',
  };

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>
        카테고리 수정: {category.name}
      </h1>
      <div className='bg-white p-6 rounded-lg shadow space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            카테고리 이름
          </label>
          <input
            type='text'
            defaultValue={category.name}
            className='mt-1 block w-full border rounded-md p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            URL Slug (수정 불가)
          </label>
          <input
            type='text'
            disabled
            value={category.slug}
            className='mt-1 block w-full border rounded-md p-2 bg-gray-100'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            대표 이미지
          </label>
          <div className='mt-1 w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer'>
            <ImageIcon size={32} />
            <p className='text-sm mt-1'>클릭하여 이미지 업로드</p>
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            소개글
          </label>
          <div className='mt-1 w-full h-80 border rounded-md bg-gray-100 text-gray-400 flex items-center justify-center'>
            [Toast UI Editor가 여기에 렌더링됩니다]
          </div>
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
