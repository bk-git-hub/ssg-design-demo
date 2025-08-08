'use client';

import Link from 'next/link';
import {
  Clock,
  UserCircle,
  Tag,
  ThumbsUp,
  Home,
  ChevronRight,
  FileText,
} from 'lucide-react';

// --- 가상 데이터 (아키텍처 설계 문서로 변경) ---
const documentData = {
  id: 103,
  title: 'XSS 스캐너 아키텍처 설계',
  author: {
    name: '김민준',
    profileImageUrl: 'https://i.pravatar.cc/150?u=1',
  },
  publishedAt: '2025-03-15',
  parentProject: {
    id: 1,
    slug: 'xss-scanner-project',
    title: 'XSS 패턴 자동 탐지 스캐너',
  },
  content: `
        <h2 id="section-1">1. 시스템 구성도</h2>
        <p>본 스캐너는 CLI 환경에서 작동하며, 크게 3개의 모듈로 구성됩니다. 각 모듈은 독립적으로 작동하며 결과를 공유합니다.</p>
        <img src="https://i.imgur.com/example-architecture.png" alt="Architecture Diagram" />
        
        <h2 id="section-2">2. 핵심 모듈 설명</h2>
        <p><strong>CrawlEngine:</strong> Python의 Requests와 BeautifulSoup 라이브러리를 사용하여 지정된 URL의 모든 하위 링크를 순회하고, 입력 가능한 폼(form)을 식별합니다.</p>
        <p><strong>PayloadInjector:</strong> 사전에 정의된 XSS 페이로드 목록을 CrawlEngine이 찾아낸 입력 지점에 삽입하여 서버에 요청을 보냅니다.</p>
        <p><strong>DetectionEngine:</strong> 서버로부터 돌아온 응답(Response)의 변화를 분석하여, 삽입된 페이로드가 성공적으로 실행되었는지(취약점이 존재하는지) 판단합니다.</p>
        
        <h2 id="section-3">3. 데이터 흐름</h2>
        <p>사용자 입력(URL) -> CrawlEngine -> PayloadInjector -> DetectionEngine -> 최종 결과 리포트 출력</p>
    `,
  comments: [
    {
      id: 1,
      author: '이수진',
      text: 'CrawlEngine에서 동적으로 생성되는 JavaScript 링크도 처리할 수 있나요?',
      likes: 3,
    },
    {
      id: 2,
      author: '박보안',
      text: 'DetectionEngine의 탐지 정확도를 높이기 위한 아이디어가 있습니다.',
      likes: 8,
    },
  ],
  siblingDocuments: [
    { id: 101, title: '프로젝트 기획서' },
    { id: 102, title: '1주차 회의록' },
    { id: 103, title: 'XSS 스캐너 아키텍처 설계' }, // 현재 문서
  ],
};

// --- UI 컴포넌트 (이하 동일) ---
const DocumentSidebar = ({
  project,
  documents,
  currentDocId,
}: {
  project: typeof documentData.parentProject;
  documents: typeof documentData.siblingDocuments;
  currentDocId: number;
}) => (
  <aside className='lg:col-span-1'>
    <div className='sticky top-24 space-y-8'>
      <div>
        <h3 className='text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider'>
          Parent Project
        </h3>
        <Link
          href={`/projects/${project.slug}`}
          className='block p-4 rounded-lg bg-gray-50 border hover:bg-gray-100 hover:border-indigo-500'
        >
          <p className='font-bold text-gray-800'>{project.title}</p>
          <p className='text-sm text-indigo-600 font-semibold mt-2'>
            프로젝트 홈으로 →
          </p>
        </Link>
      </div>

      <div>
        <h3 className='text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider'>
          Documents in this Project
        </h3>
        <nav className='flex flex-col space-y-1'>
          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/projects/${project.slug}/documents/${doc.id}`}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                doc.id === currentDocId
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText size={14} className='mr-2 flex-shrink-0' />
              <span>{doc.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </aside>
);

export default function DocumentDetailPage() {
  const doc = documentData;

  return (
    <div className='bg-white min-h-screen'>
      <main className='container mx-auto px-4 py-12'>
        <div className='mb-6'>
          <p className='text-sm text-gray-500 flex items-center'>
            <Link href='/hub' className='hover:underline'>
              Hub
            </Link>
            <span className='mx-2'>&gt;</span>
            <Link
              href={`/projects/${doc.parentProject.slug}`}
              className='hover:underline'
            >
              {doc.parentProject.title}
            </Link>
            <span className='mx-2'>&gt;</span>
            <span className='font-semibold text-gray-700'>{doc.title}</span>
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
          <div className='lg:col-span-3'>
            <article>
              <header className='mb-8 border-b pb-4'>
                <h1 className='text-4xl lg:text-5xl font-extrabold leading-tight'>
                  {doc.title}
                </h1>
                <div className='flex items-center space-x-4 text-sm text-gray-500 mt-4'>
                  <div className='flex items-center space-x-2'>
                    <img
                      src={doc.author.profileImageUrl}
                      alt={doc.author.name}
                      className='w-8 h-8 rounded-full'
                    />
                    <span className='font-semibold text-gray-800'>
                      {doc.author.name}
                    </span>
                  </div>
                  <span>&middot;</span>
                  <div className='flex items-center'>
                    <Clock size={14} className='mr-1.5' /> {doc.publishedAt}
                  </div>
                </div>
              </header>

              <div
                className='prose prose-lg max-w-none'
                dangerouslySetInnerHTML={{ __html: doc.content }}
              />
            </article>

            <section className='mt-12 pt-8 border-t'>
              <h2 className='text-2xl font-bold mb-6'>
                {doc.comments.length} Comments
              </h2>
              <div className='space-y-6'>
                {doc.comments.map((comment) => (
                  <div key={comment.id} className='flex items-start space-x-3'>
                    <UserCircle
                      size={40}
                      className='text-gray-400 flex-shrink-0'
                    />
                    <div className='flex-grow bg-gray-50 p-4 rounded-lg'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <p className='font-semibold text-sm'>
                            {comment.author}
                          </p>
                          <p className='text-gray-700 mt-1'>{comment.text}</p>
                        </div>
                        <button className='flex items-center space-x-1 text-xs text-gray-500 hover:text-indigo-600 font-semibold'>
                          <ThumbsUp size={14} />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='pt-6 border-t'>
                  <h3 className='font-semibold mb-2'>댓글 남기기</h3>
                  <textarea
                    className='w-full p-2 border rounded-md'
                    rows={3}
                    placeholder='의견을 남겨주세요...'
                  ></textarea>
                  <button className='mt-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700'>
                    댓글 등록
                  </button>
                </div>
              </div>
            </section>
          </div>

          <DocumentSidebar
            project={doc.parentProject}
            documents={doc.siblingDocuments}
            currentDocId={doc.id}
          />
        </div>
      </main>
    </div>
  );
}
