'use client';
import { Award, ImageIcon, Save } from 'lucide-react';

export default function EditBadgePage() {
  const badge = {
    name: '이달의 기여자',
    description:
      '한 달간 가장 많은 아티클을 작성하거나 우수 답변을 채택받은 멤버에게 수여됩니다.',
    imageUrl: '',
  };

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>뱃지 수정: {badge.name}</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2 bg-white p-6 rounded-lg shadow space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              뱃지 이름
            </label>
            <input
              type='text'
              defaultValue={badge.name}
              className='mt-1 block w-full border rounded-md p-2'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              획득 조건 설명
            </label>
            <textarea
              rows={4}
              defaultValue={badge.description}
              className='mt-1 w-full border rounded-lg p-2'
            ></textarea>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              뱃지 아이콘
            </label>
            <div className='mt-1 w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer'>
              <ImageIcon size={24} />
              <p className='text-xs mt-1'>클릭하여 아이콘 업로드</p>
            </div>
          </div>
          <div className='flex justify-end border-t pt-4'>
            <button className='flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700'>
              <Save size={16} className='mr-2' /> 저장하기
            </button>
          </div>
        </div>
        <div className='md:col-span-1'>
          <h3 className='font-bold mb-2'>뱃지 미리보기</h3>
          <div className='bg-white p-4 rounded-lg shadow flex items-center'>
            <div className='p-2 bg-yellow-100 rounded-full mr-3'>
              <Award size={24} className='text-yellow-500' />
            </div>
            <div>
              <p className='font-semibold'>{badge.name}</p>
              <p className='text-xs text-gray-500'>{badge.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
