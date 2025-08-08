'use client';

import { useState } from 'react';
import {
  Image as ImageIcon,
  Tag,
  Save,
  Send,
  Eye,
  CheckCircle,
} from 'lucide-react';

// --- 가상 데이터 ---
const documentTypes = ['회의록', '기획서', '디자인', '버그리포트', '기술 문서'];

// --- UI 컴포넌트 ---
const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className='border-t pt-4'>
    <h3 className='text-sm font-bold text-gray-500 mb-3'>{title}</h3>
    {children}
  </div>
);

export default function NewDocumentPage() {
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState('기술 문서');

  // URL로부터 현재 프로젝트 이름을 가져왔다고 가정
  const currentProjectName = 'SSG 홈페이지 개발';

  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-8'>
        <div className='mb-6'>
          <p className='text-sm text-gray-500'>
            <a href='/projects' className='hover:underline'>
              프로젝트
            </a>
            <span className='mx-2'>&gt;</span>
            <a href='#' className='hover:underline'>
              {currentProjectName}
            </a>
            <span className='mx-2'>&gt;</span>
            <span className='font-semibold text-gray-700'>
              새 도큐먼트 작성
            </span>
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 items-start'>
          {/* --- 1. 메인 에디터 영역 --- */}
          <div className='lg:col-span-3 bg-white p-6 rounded-lg border'>
            <input
              type='text'
              placeholder='도큐먼트 제목을 입력하세요'
              className='w-full text-3xl font-extrabold border-b-2 pb-2 mb-8 focus:outline-none focus:border-indigo-500'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className='w-full h-[600px] border rounded-md bg-gray-100 text-gray-400 flex items-center justify-center'>
              [위지윅(WYSIWYG) 에디터가 여기에 렌더링됩니다.]
            </div>
          </div>

          {/* --- 2. 설정 사이드바 --- */}
          <aside className='lg:col-span-1'>
            <div className='sticky top-24 bg-white p-6 rounded-lg border space-y-6'>
              {/* 발행 버튼 */}
              <div className='space-y-2'>
                <button className='w-full flex items-center justify-center text-sm bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-lg'>
                  <Send size={14} className='mr-2' /> 저장하기
                </button>
                <button className='w-full flex items-center justify-center text-sm text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100'>
                  <Eye size={14} className='mr-2' /> 미리보기
                </button>
              </div>

              {/* 모든 메타데이터 설정을 사이드바로 이동 */}
              <SidebarSection title='도큐먼트 종류'>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className='w-full border rounded-md p-2 text-sm'
                >
                  {documentTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </SidebarSection>

              <SidebarSection title='썸네일 이미지 (선택)'>
                <div className='w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer'>
                  <ImageIcon size={24} />
                  <p className='text-xs mt-1'>이미지 업로드</p>
                </div>
              </SidebarSection>

              <SidebarSection title='기술 태그 (선택)'>
                <input
                  type='text'
                  placeholder='태그 검색 및 추가...'
                  className='w-full border rounded-lg px-3 py-2 text-sm'
                />
              </SidebarSection>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
