'use client';

import { useState, useRef } from 'react';
import { Eye } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Editor as EditorType } from '@toast-ui/react-editor';
import { ImageIcon } from 'lucide-react';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

// --- 에디터에 미리 채워넣을 목업 데이터 ---
const mockMarkdown = `
# SSG 프로젝트 아키텍처 설계

## 1. 개요
본 문서는 SSG 동아리 플랫폼의 전체 시스템 아키텍처를 정의합니다.

## 2. 기술 스택
- **프레임워크**: Next.js (App Router)
- **UI**: Tailwind CSS
`;

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
  const editorRef = useRef<EditorType>(null);
  const [title, setTitle] = useState('SSG 프로젝트 아키텍처 설계');

  const handlePreview = () => {
    if (!editorRef.current) return;

    const content = editorRef.current.getInstance().getMarkdown();
    const tempId = `preview_${Date.now()}`;

    // 미리보기에 필요한 데이터를 객체로 만듭니다.
    const previewData = {
      title,
      content,
      author: {
        name: '김민준',
        profileImageUrl: 'https://i.pravatar.cc/150?u=1',
      },
      publishedAt: '방금 전',
      category: { name: '개발 문화', slug: 'dev-culture' },
      tags: ['Architecture', 'Next.js'],
    };

    // localStorage에 임시 데이터 저장
    localStorage.setItem(tempId, JSON.stringify(previewData));

    // 새 탭으로 미리보기 페이지 열기
    window.open(`/articles/preview/${tempId}`, '_blank');
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>아티클 작성</h1>
          <div className='flex gap-2'>
            <button className='text-sm bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-lg'>
              발행하기
            </button>
            <button
              onClick={handlePreview}
              className='flex items-center text-sm text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 border bg-white'
            >
              <Eye size={14} className='mr-2' /> 미리보기
            </button>
            <button className='text-sm bg-white border font-semibold py-2 px-4 rounded-lg hover:bg-gray-100'>
              임시저장
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='bg-white p-6 rounded-lg border lg:col-span-3'>
            <input
              type='text'
              placeholder='제목을 입력하세요'
              className='w-full text-3xl font-extrabold border-b-2 pb-2 mb-6 focus:outline-none focus:border-indigo-500'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className='mt-4'>
              <Editor ref={editorRef} initialValue={mockMarkdown} />
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
