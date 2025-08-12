'use client';

import { useState } from 'react';
import {
  Award,
  ImageIcon,
  Save,
  Check,
  PlusCircle,
  Trash2,
} from 'lucide-react';

export default function CreateBadgePage() {
  // 뱃지 획득 조건을 관리하는 상태
  const [conditions, setConditions] = useState([
    { type: 'ARTICLE_COUNT', value: 5 },
  ]);

  const addCondition = () => {
    setConditions([...conditions, { type: 'PROJECT_COUNT', value: 1 }]);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>새 뱃지 만들기</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
        <div className='md:col-span-2 bg-white p-6 rounded-lg shadow space-y-6'>
          {/* 뱃지 기본 정보 */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              뱃지 이름
            </label>
            <input
              type='text'
              placeholder='예: Q&A 해결사'
              className='mt-1 block w-full border rounded-md p-2'
            />
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

          {/* ✨ 뱃지 획득 조건 설정 ✨ */}
          <div>
            <h3 className='text-lg font-bold text-gray-800 mb-2'>획득 조건</h3>
            <p className='text-sm text-gray-500 mb-4'>
              아래 조건들을 '모두' 만족해야 뱃지가 자동으로 부여됩니다. '관리자
              직접 부여'는 수동으로만 줄 수 있습니다.
            </p>
            <div className='space-y-3'>
              {conditions.map((cond, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-2 p-3 bg-gray-50 rounded-md border'
                >
                  <select
                    defaultValue={cond.type}
                    className='border rounded-md p-2 text-sm'
                  >
                    <option value='ARTICLE_COUNT'>아티클 작성 수</option>
                    <option value='PROJECT_COUNT'>프로젝트 참여 수</option>
                    <option value='COMMENT_COUNT'>댓글 작성 수</option>
                    <option value='ADMIN_MANUAL'>관리자 직접 부여</option>
                  </select>
                  <input
                    type='number'
                    defaultValue={cond.value}
                    className='w-24 border rounded-md p-2 text-sm'
                  />
                  <span className='text-sm'>개 이상</span>
                  <button
                    onClick={() => removeCondition(index)}
                    className='text-gray-400 hover:text-red-500'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={addCondition}
                className='flex items-center text-sm font-semibold text-indigo-600 hover:underline'
              >
                <PlusCircle size={14} className='mr-1' /> 조건 추가하기 (AND)
              </button>
            </div>
          </div>
          <div className='flex justify-end border-t pt-4 mt-6'>
            <button className='flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700'>
              <Save size={16} className='mr-2' /> 뱃지 생성하기
            </button>
          </div>
        </div>

        {/* 미리보기 영역 */}
        <div className='md:col-span-1'>
          <h3 className='font-bold mb-2'>뱃지 미리보기</h3>
          <div className='bg-white p-4 rounded-lg shadow'>
            <div className='flex items-center p-4 bg-gray-50 border rounded-lg'>
              <div className='flex-shrink-0 text-yellow-500 mr-4'>
                <Award size={24} />
              </div>
              <div>
                <p className='font-bold text-gray-800'>뱃지 이름</p>
                <p className='text-sm text-gray-600 mt-1'>
                  획득 조건 설명이 여기에 표시됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
