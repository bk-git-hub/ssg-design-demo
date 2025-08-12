'use client';

import Link from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';
import {
  Github,
  PlayCircle,
  Users,
  Tag,
  UserCircle,
  ThumbsUp,
  Pencil,
  PlusCircle,
  FileUp,
  Link as LinkIcon,
  UserPlus,
  ChevronUp,
  FileText,
} from 'lucide-react';

// --- 가상 데이터 ---
const projectData = {
  id: 1,
  title: 'XSS 패턴 자동 탐지 스캐너',
  summary:
    'Python 기반으로 지정된 URL에서 반사(Reflected) XSS 취약점을 자동으로 탐지하는 도구',
  thumbnailUrl:
    'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1200&q=80',
  period: { start: '2025-03-01', end: '2025-05-31' },
  status: '완료',
  links: [{ type: 'GitHub', value: 'https://github.com/...' }],
  attachment: { fileName: 'Final-Report.pdf' },
  team: [
    {
      id: 1,
      name: '김민준',
      role: 'Team Leader',
      profileImageUrl: 'https://i.pravatar.cc/150?u=1',
    },
    {
      id: 2,
      name: '이수진',
      role: 'Backend Developer',
      profileImageUrl: 'https://i.pravatar.cc/150?u=2',
    },
  ],
  categories: ['웹 해킹', '보안 도구 개발'],
  tags: ['Python', 'Scanner', 'XSS'],
  documents: [
    { id: 101, title: '프로젝트 기획서' },
    { id: 102, title: '1주차 회의록' },
    { id: 103, title: 'API 명세서' },
  ],
  content: `
        <h2>1. 프로젝트 배경 및 목표</h2>
        <p>많은 웹 애플리케이션에서 XSS 취약점이 여전히 발견되고 있습니다. 초기 단계에서 이를 자동으로 탐지할 수 있는 간단한 도구가 필요하다고 생각했습니다. 본 프로젝트의 목표는 지정된 URL의 파라미터를 분석하여 기본적인 Reflected XSS 패턴을 탐지하는 Python 기반 스캐너를 개발하는 것입니다.</p>
        <h2>2. 주요 내용 및 과정</h2>
        <p>Requests와 BeautifulSoup 라이브러리를 사용하여 웹 페이지를 크롤링하고, 폼(form)과 입력 필드를 분석했습니다. 이후 사전에 정의된 XSS 페이로드 목록을 삽입하여 서버의 응답 변화를 감지하는 방식으로 탐지 로직을 구현했습니다.</p>
        <h2>3. 최종 결과 및 회고</h2>
        <p>개발 결과, 간단한 GET/POST 기반의 Reflected XSS는 성공적으로 탐지할 수 있었습니다. 하지만 DOM-based XSS나 고도화된 필터링을 우회하는 것은 한계가 있었습니다. 프로젝트를 통해 웹 요청과 응답의 구조를 깊이 이해할 수 있었으며, 다음 프로젝트에서는 탐지 엔진을 더 고도화해보고 싶습니다.</p>
    `,
  previousProject: {
    id: null,
    slug: null,
    title: null,
  },
  nextProjects: [
    { slug: 'xss-scanner-v1.1', title: 'v1.1 성능 개선' },
    { slug: 'xss-scanner-v1.2', title: 'v1.2 DOM-based 탐지 추가' },
    { slug: 'xss-scanner-v1.3', title: 'v1.3 리포팅 기능 추가' },
  ],
};

const ProjectSidebar = ({ project }: { project: typeof projectData }) => (
  <aside className='lg:col-span-1'>
    <div className='sticky top-24 bg-gray-50 p-4 rounded-lg border space-y-2'>
      {/* ✨ 수정된 부분: <Disclosure>에 as="div" 추가 */}
      <Disclosure as='div' defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className='w-full flex justify-between items-center text-left font-bold text-gray-800 p-2 rounded-lg hover:bg-gray-200'>
              프로젝트 정보
              <ChevronUp
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Transition
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Disclosure.Panel className='px-2 pb-2 pt-1 text-sm text-gray-500 space-y-6'>
                <div className='space-y-3'>
                  <p>
                    <span className='font-semibold'>상태:</span>{' '}
                    <span className='px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs'>
                      {project.status}
                    </span>
                  </p>
                  <p>
                    <span className='font-semibold'>기간:</span>{' '}
                    {project.period.start} ~ {project.period.end}
                  </p>
                </div>
                <div>
                  <h4 className='font-semibold mb-2'>카테고리</h4>
                  <div className='flex flex-wrap gap-2'>
                    {project.categories.map((cat) => (
                      <Link
                        key={cat}
                        href='#'
                        className='text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded hover:bg-indigo-200'
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className='font-semibold mb-2'>사용 기술</h4>
                  <div className='flex flex-wrap gap-2'>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className='text-xs bg-gray-200 px-2 py-1 rounded'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className='font-semibold mb-2'>링크</h4>
                  {project.links.map((link) => (
                    <a
                      key={link.type}
                      href={link.value}
                      className='flex items-center text-indigo-600 hover:underline text-sm'
                    >
                      <LinkIcon size={14} className='mr-2' /> {link.type}
                    </a>
                  ))}
                </div>
                <div>
                  <h4 className='font-semibold mb-2'>결과물</h4>
                  <a
                    href='#'
                    className='flex items-center text-indigo-600 hover:underline text-sm'
                  >
                    <FileUp size={14} className='mr-2' />{' '}
                    {project.attachment.fileName}
                  </a>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>

      <Disclosure as='div'>
        {({ open }) => (
          <>
            <Disclosure.Button className='w-full flex justify-between items-center text-left font-bold text-gray-800 p-2 rounded-lg hover:bg-gray-200'>
              멤버 ({project.team.length})
              <ChevronUp
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Transition
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Disclosure.Panel className='px-2 pb-2 pt-1 text-sm text-gray-500 space-y-3'>
                {project.team.map((member) => (
                  <Link
                    key={member.id}
                    href={`/members/${member.id}`}
                    className='flex items-center space-x-3 group'
                  >
                    <img
                      src={member.profileImageUrl}
                      alt={member.name}
                      className='w-8 h-8 rounded-full'
                    />
                    <div>
                      <p className='font-semibold text-gray-800 group-hover:text-indigo-600'>
                        {member.name}
                      </p>
                      <p className='text-xs text-gray-500'>{member.role}</p>
                    </div>
                  </Link>
                ))}
                <button className='flex items-center justify-center w-full mt-2 p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold text-sm'>
                  <UserPlus size={14} className='mr-2' />
                  멤버 추가
                </button>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>

      <Disclosure as='div'>
        {({ open }) => (
          <>
            <Disclosure.Button className='w-full flex justify-between items-center text-left font-bold text-gray-800 p-2 rounded-lg hover:bg-gray-200'>
              도큐먼트 ({project.documents.length})
              <ChevronUp
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Transition
              enter='transition duration-100 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Disclosure.Panel className='px-2 pb-2 pt-1 text-sm text-gray-500 space-y-2'>
                {project.documents.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`11/documents/${doc.id}`}
                    className='flex items-center p-1 rounded-md hover:bg-gray-200'
                  >
                    <FileText size={14} className='mr-2 text-gray-500' />
                    <span className='text-gray-700'>{doc.title}</span>
                  </Link>
                ))}
                <Link
                  href={`/projects/PROJECT_ID/documents/new`}
                  className='flex items-center justify-center w-full mt-2 p-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 font-semibold text-sm'
                >
                  <PlusCircle size={14} className='mr-2' />새 도큐먼트 작성
                </Link>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <Disclosure as='div'>
        {({ open }) => (
          <>
            <Disclosure.Button className='w-full flex justify-between items-center text-left font-bold text-gray-800 p-2 rounded-lg hover:bg-gray-200'>
              연관 프로젝트
              <ChevronUp
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className='px-2 pb-2 pt-1 text-sm text-gray-500 space-y-2'>
              {/* 선행 프로젝트 */}
              <div>
                <h4 className='font-semibold text-gray-600 mb-1'>
                  선행 프로젝트
                </h4>
                {project.previousProject.id ? (
                  <Link
                    href={`/projects/${project.previousProject.slug}`}
                    className='text-indigo-600 hover:underline'
                  >
                    {project.previousProject.title}
                  </Link>
                ) : (
                  <span className='text-gray-400'>없음</span>
                )}
              </div>

              {/* 후속 프로젝트 목록 */}
              <div>
                <h4 className='font-semibold text-gray-600 mb-2'>
                  후속 프로젝트
                </h4>
                <div className='space-y-1'>
                  {project.nextProjects.map((nextProj) => (
                    <Link
                      key={nextProj.slug}
                      href={`/projects/${nextProj.slug}`}
                      className='block p-1 rounded-md hover:bg-gray-200 text-indigo-600'
                    >
                      {nextProj.title} →
                    </Link>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  </aside>
);

export default function ProjectDetailPage() {
  const project = projectData;

  return (
    <div className='bg-white min-h-screen'>
      <main className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
          <ProjectSidebar project={project} />

          <div className='lg:col-span-3'>
            <header className='mb-8 '>
              <div className='flex w-full justify-between'>
                <h1 className='text-4xl lg:text-5xl font-extrabold my-2 leading-tight'>
                  {project.title}
                </h1>

                <Link
                  href='/path/to/edit/page'
                  className='flex items-center justify-center w-fit h-fit text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold py-2 px-3 rounded-lg'
                >
                  <Pencil size={14} className='mr-2' />
                  수정하기
                </Link>
              </div>
              <p className='text-lg text-gray-600'>{project.summary}</p>
            </header>
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className='w-full rounded-lg shadow-md mb-8'
            />
            <article className='prose prose-lg max-w-none'>
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </article>
            <section className='mt-12 pt-8 border-t'>
              {/* 좋아요 버튼 */}
              <div className='flex justify-center mb-12'>
                <button className='flex flex-col items-center space-y-2 text-gray-600 hover:text-indigo-600 transition-colors group'>
                  <div className='p-3 border-2 rounded-full group-hover:border-indigo-500'>
                    <ThumbsUp size={28} />
                  </div>
                  <span className='font-bold text-lg'>128</span>
                </button>
              </div>

              {/* 댓글 섹션 */}
              <div>
                <h2 className='text-2xl font-bold mb-6'>3 Comments</h2>
                <div className='space-y-6'>
                  {/* 댓글 목록 예시 */}
                  <div className='flex items-start space-x-3'>
                    <UserCircle
                      size={40}
                      className='text-gray-400 flex-shrink-0'
                    />
                    <div className='flex-grow bg-gray-50 p-4 rounded-lg'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <p className='font-semibold text-sm'>김민준</p>
                          <p className='text-gray-700 mt-1'>
                            프로젝트 정말 멋지네요! 영감을 많이 얻어갑니다.
                          </p>
                        </div>
                        <button className='flex items-center space-x-1 text-xs text-gray-500 hover:text-indigo-600 font-semibold'>
                          <ThumbsUp size={14} />
                          <span>12</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-start space-x-3'>
                    <UserCircle
                      size={40}
                      className='text-gray-400 flex-shrink-0'
                    />
                    <div className='flex-grow bg-gray-50 p-4 rounded-lg'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <p className='font-semibold text-sm'>이수진</p>
                          <p className='text-gray-700 mt-1'>
                            기술 스택 선택 이유가 궁금해요!
                          </p>
                        </div>
                        <button className='flex items-center space-x-1 text-xs text-gray-500 hover:text-indigo-600 font-semibold'>
                          <ThumbsUp size={14} />
                          <span>5</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 댓글 작성 폼 */}
                  <div className='pt-6 border-t'>
                    <h3 className='font-semibold mb-2'>댓글 남기기</h3>
                    <textarea
                      className='w-full p-2 border rounded-md'
                      rows={3}
                      placeholder='프로젝트에 대한 의견을 남겨주세요...'
                    ></textarea>
                    <button className='mt-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700'>
                      댓글 등록
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
