'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Image as ImageIcon,
  Tag,
  Bookmark,
  Send,
} from 'lucide-react';

// ✨ 1. dynamic import를 사용합니다.
import dynamic from 'next/dynamic';
// ✨ 2. TuiEditor 컴포넌트는 오직 클라이언트 사이드에서만 렌더링되도록 설정합니다.
const TuiEditor = dynamic(() => import('@/components/Editor'), { ssr: false });

// --- 가상 데이터 ---
const allCategories = [
  '웹 해킹',
  '리버싱',
  '포렌식',
  'CTF',
  '개발 문화',
  '시스템 해킹',
  '네트워크 보안',
  '악성코드 분석',
  '암호학',
];

// --- UI 컴포넌트 ---
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className='border-t first:border-t-0 pt-4 first:pt-0'>
    <h3 className='text-sm font-bold text-gray-500 mb-3'>{title}</h3>
    {children}
  </div>
);

export default function ArticleCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>아티클 작성</h1>
          <div className='flex space-x-2'>
            <button className='text-sm bg-white border font-semibold py-2 px-4 rounded-lg hover:bg-gray-100'>
              임시저장
            </button>
            <button className='text-sm bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-lg'>
              발행하기
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-3 bg-white p-6 rounded-lg border'>
            <input
              type='text'
              placeholder='제목을 입력하세요'
              className='w-full text-2xl font-bold border-b-2 p-2 mb-4 focus:outline-none'
            />

            {/* ✨ 3. 실제 에디터 컴포넌트를 사용합니다. */}
            <div className='mt-4'>
              <TuiEditor />
            </div>
          </div>

          <aside className='lg:col-span-1'>
            <div className='sticky top-24 bg-white p-6 rounded-lg border space-y-6'>
              <Section title='카테고리'>
                <div className='space-y-2 max-h-40 overflow-y-auto border rounded-md p-2'>
                  {allCategories.map((cat) => (
                    <label
                      key={cat}
                      className='flex items-center text-gray-700 p-1 rounded hover:bg-gray-100'
                    >
                      <input type='checkbox' className='h-4 w-4 rounded' />
                      <span className='ml-2'>{cat}</span>
                    </label>
                  ))}
                </div>
              </Section>
              <Section title='기술 태그'>
                <input
                  type='text'
                  placeholder='태그를 입력하세요 (예: React)'
                  className='w-full border rounded-lg px-3 py-2'
                />
              </Section>
              <Section title='대표 이미지'>
                <div className='w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer'>
                  <ImageIcon size={24} />
                  <p className='text-xs mt-1'>클릭하여 이미지 업로드</p>
                </div>
              </Section>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
