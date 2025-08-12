'use client';
import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import { Editor as EditorType } from '@toast-ui/react-editor';
import {
  Image as ImageIcon,
  Link as LinkIcon,
  Users,
  Folder,
  Tag,
  Save,
  Send,
  Eye,
  CheckCircle,
  Search,
  X,
  Plus,
  FileUp,
  Github,
} from 'lucide-react';

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
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });
const Section = ({
  title,
  children,
  optional = false,
}: {
  title: string;
  children: React.ReactNode;
  optional?: boolean;
}) => (
  <div className='bg-white p-6 rounded-lg border'>
    <h2 className='text-xl font-bold border-b pb-3 mb-4'>
      {title}
      {optional && (
        <span className='text-sm font-normal text-gray-400 ml-2'>(선택)</span>
      )}
    </h2>
    {children}
  </div>
);
const mockProjectContent = `
## 1. 프로젝트 배경 및 목표
많은 웹 애플리케이션에서 XSS 취약점이 여전히 발견되고 있습니다. 초기 단계에서 이를 자동으로 탐지할 수 있는 간단한 도구가 필요하다고 생각했습니다. 본 프로젝트의 목표는 지정된 URL의 파라미터를 분석하여 기본적인 Reflected XSS 패턴을 탐지하는 Python 기반 스캐너를 개발하는 것입니다.

## 2. 주요 내용 및 과정
Requests와 BeautifulSoup 라이브러리를 사용하여 웹 페이지를 크롤링하고, 폼(form)과 입력 필드를 분석했습니다. 이후 사전에 정의된 XSS 페이로드 목록을 삽입하여 서버의 응답 변화를 감지하는 방식으로 탐지 로직을 구현했습니다.

## 3. 최종 결과 및 회고
개발 결과, 간단한 GET/POST 기반의 Reflected XSS는 성공적으로 탐지할 수 있었습니다.
`;

const ChecklistItem = ({ text, isDone }: { text: string; isDone: boolean }) => (
  <div
    className={`flex items-center transition-colors ${
      isDone ? 'text-green-600' : 'text-gray-500'
    }`}
  >
    <CheckCircle
      size={16}
      className={`mr-2 flex-shrink-0 ${
        isDone ? 'fill-green-500 text-white' : ''
      }`}
    />
    <span className={`text-sm ${isDone ? 'line-through' : ''}`}>{text}</span>
  </div>
);

const AssistantSidebar = ({
  checklist,
  onPreview,
}: {
  checklist: Record<string, boolean>;
  onPreview: () => void;
}) => (
  <aside className='lg:col-span-1'>
    <div className='sticky top-24 bg-white p-6 rounded-lg border space-y-6'>
      <div className='space-y-2'>
        <button className='w-full flex items-center justify-center text-sm bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-lg'>
          <Send size={14} className='mr-2' /> 발행하기
        </button>
        <button className='w-full flex items-center justify-center text-sm bg-white border font-semibold py-2 px-4 rounded-lg hover:bg-gray-100'>
          <Save size={14} className='mr-2' /> 임시 저장
        </button>
        <button
          onClick={onPreview}
          className='w-full flex items-center justify-center text-sm text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100'
        >
          <Eye size={14} className='mr-2' /> 미리보기
        </button>
      </div>
      <div className='border-t pt-4'>
        <h3 className='text-sm font-bold text-gray-500 mb-3'>
          작성 가이드 체크리스트
        </h3>
        <div className='space-y-2'>
          <ChecklistItem
            text='제목 및 요약 작성'
            isDone={checklist.hasTitleAndSummary}
          />
          <ChecklistItem text='본문 내용 작성' isDone={checklist.hasContent} />
          {/* ... other checklist items */}
        </div>
      </div>
    </div>
  </aside>
);

export default function ProjectCreatePage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  // ✨ 3. 기술태그 & 참여인원 mock data 추가 ✨
  const [selectedMembers, setSelectedMembers] = useState([
    { id: 1, name: '김민준', profileImageUrl: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: '이수진', profileImageUrl: 'https://i.pravatar.cc/150?u=2' },
  ]);
  const [selectedTags, setSelectedTags] = useState(['React', 'Next.js']);

  const filteredCategories = allCategories.filter((cat) =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const checklist = {
    hasTitleAndSummary: title.length > 5 && summary.length > 10,
    hasMembers: selectedMembers.length > 0,
    hasCategories: true,
    hasTags: selectedTags.length > 0,
  };
  const editorRef = useRef<EditorType>(null);

  const handlePreview = () => {
    if (!editorRef.current) return;
    const content = editorRef.current.getInstance().getMarkdown();
    const tempId = `preview_project_${Date.now()}`;
    const previewData = { title, summary, content };
    localStorage.setItem(tempId, JSON.stringify(previewData));
    window.open(`/projects/preview/${tempId}`, '_blank');
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 items-start'>
          <div className='lg:col-span-3 space-y-8'>
            <Section title='프로젝트 정보'>
              <input
                type='text'
                placeholder='프로젝트 제목'
                className='w-full text-3xl font-extrabold border-b-2 pb-2 mb-4 focus:outline-none focus:border-indigo-500'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type='text'
                placeholder='프로젝트 한 줄 요약'
                className='w-full text-md text-gray-600 border-b pb-2 focus:outline-none'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <Section title='본문 작성'>
                <Editor ref={editorRef} initialValue={mockProjectContent} />
              </Section>

              <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-bold text-gray-500 mb-2'>
                    대표 이미지
                  </label>
                  <div className='w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer'>
                    <ImageIcon size={24} />
                    <p className='text-xs mt-1'>이미지 업로드</p>
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-bold text-gray-500 mb-2'>
                    프로젝트 기간
                  </label>
                  <div className='flex items-center space-x-2'>
                    <input
                      type='date'
                      className='w-full border rounded-lg px-3 py-2 text-sm'
                    />
                    <span>~</span>
                    <input
                      type='date'
                      className='w-full border rounded-lg px-3 py-2 text-sm'
                    />
                  </div>
                </div>

                {/* ✨ 1. 카테고리 (검색 + 체크박스) ✨ */}
                <div>
                  <label className='block text-sm font-bold text-gray-500 mb-2'>
                    관련 카테고리
                  </label>
                  <div className='relative mb-2'>
                    <Search className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <input
                      type='text'
                      placeholder='카테고리 검색'
                      className='w-full border rounded-md pl-8 pr-2 py-1.5 text-sm'
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                    />
                  </div>
                  <div className='space-y-2 max-h-32 overflow-y-auto border rounded-md p-2'>
                    {filteredCategories.map((cat) => (
                      <label
                        key={cat}
                        className='flex items-center text-gray-700 p-1 rounded hover:bg-gray-100'
                      >
                        <input type='checkbox' className='h-4 w-4 rounded' />
                        <span className='ml-2'>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-bold text-gray-500 mb-2'>
                    사용 기술
                  </label>
                  <input
                    type='text'
                    placeholder='태그 검색 및 추가...'
                    className='w-full border rounded-lg px-3 py-2 text-sm'
                  />
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className='bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center'
                      >
                        #{tag}{' '}
                        <button className='ml-1.5 text-indigo-400 hover:text-indigo-800'>
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-bold text-gray-500 mb-2'>
                    참여 멤버
                  </label>
                  <input
                    type='text'
                    placeholder='이름으로 멤버 검색...'
                    className='w-full border rounded-lg px-3 py-2 text-sm mb-2'
                  />
                  <div className='space-y-2'>
                    {selectedMembers.map((member) => (
                      <div
                        key={member.id}
                        className='flex items-center justify-between bg-gray-100 p-2 rounded-md'
                      >
                        <div className='flex items-center'>
                          <img
                            src={member.profileImageUrl}
                            className='w-6 h-6 rounded-full mr-2'
                          />
                          <span className='text-sm font-medium'>
                            {member.name}
                          </span>
                        </div>
                        <button className='text-gray-400 hover:text-red-500'>
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-bold text-gray-500 mb-2'>
                    프로젝트 링크
                  </label>
                  {/* ✨ 2. 추가 버튼 아래로 목록이 오도록 수정 ✨ */}
                  <div className='flex items-center space-x-2 mb-3'>
                    <select className='border rounded-md px-2 py-2 text-sm'>
                      <option>GitHub</option>
                      <option>배포 링크</option>
                    </select>
                    <input
                      type='text'
                      placeholder='URL을 입력하세요'
                      className='w-full border rounded-md px-3 py-2 text-sm'
                    />
                    <button className='bg-gray-200 hover:bg-gray-300 p-2 rounded-md'>
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex items-center text-sm p-2 bg-gray-100 rounded'>
                      <Github size={14} className='mr-2 text-gray-500' />
                      <span className='text-indigo-600 truncate flex-grow'>
                        https://github.com/user/repo
                      </span>
                      <button className='ml-2 text-gray-400 hover:text-red-500'>
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-bold text-gray-500 mb-2'>
                    결과물 첨부 (선택)
                  </label>
                  <div className='w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer'>
                    <FileUp size={24} />
                    <p className='text-xs mt-1'>파일 첨부</p>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          <AssistantSidebar checklist={checklist} onPreview={handlePreview} />
        </div>
      </main>
    </div>
  );
}
