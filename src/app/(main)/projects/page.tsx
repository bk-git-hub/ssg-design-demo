import Link from 'next/link';
import { Search, ListFilter, PlusCircle, FileText } from 'lucide-react';

// --- 가상 데이터 ---
const allProjects = [
  {
    id: 1,
    title: 'XSS 패턴 자동 탐지 스캐너',
    summary: 'Python 기반으로 URL의 XSS 취약점을 자동으로 탐지하는 도구',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&q=80',
    categories: ['웹 해킹', '보안 도구 개발'],
    team: [
      { name: '김민준', profileImageUrl: 'https://i.pravatar.cc/150?u=1' },
      { name: '이수진', profileImageUrl: 'https://i.pravatar.cc/150?u=2' },
    ],
    documentCount: 5,
  },
  {
    id: 2,
    title: 'SSG 동아리 홈페이지 & Hub 개발',
    summary: 'Next.js와 TypeScript를 이용한 동아리 공식 웹사이트 및 Hub 구축',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&q=80',
    categories: ['웹 개발'],
    team: [
      { name: '김민준', profileImageUrl: 'https://i.pravatar.cc/150?u=1' },
      { name: '강신입', profileImageUrl: 'https://i.pravatar.cc/150?u=6' },
      { name: '최고수', profileImageUrl: 'https://i.pravatar.cc/150?u=4' },
    ],
    documentCount: 12,
  },
  {
    id: 3,
    title: '간단한 악성코드 분석 보고서',
    summary:
      '알려진 랜섬웨어 샘플의 동작 방식을 정적으로 분석하고 보고서를 작성합니다.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=500&q=80',
    categories: ['리버싱', '악성코드 분석'],
    team: [
      { name: '박보안', profileImageUrl: 'https://i.pravatar.cc/150?u=3' },
    ],
    documentCount: 3,
  },
  {
    id: 4,
    title: '삭제된 NTFS 파일 시스템 복구',
    summary:
      '디스크의 MFT(Master File Table)를 직접 분석하여 삭제된 파일을 복구하는 프로젝트',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=500&q=80',
    categories: ['포렌식'],
    team: [
      { name: '정데이터', profileImageUrl: 'https://i.pravatar.cc/150?u=5' },
      { name: '최고수', profileImageUrl: 'https://i.pravatar.cc/150?u=4' },
    ],
    documentCount: 2,
  },
  {
    id: 5,
    title: '교내 Wi-Fi 네트워크 취약점 분석',
    summary:
      '교내 공용 Wi-Fi의 보안 설정과 잠재적 위협에 대해 분석하고 개선안을 제시합니다.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&q=80',
    categories: ['네트워크 보안'],
    team: [
      { name: '박보안', profileImageUrl: 'https://i.pravatar.cc/150?u=3' },
      { name: '김민준', profileImageUrl: 'https://i.pravatar.cc/150?u=1' },
    ],
    documentCount: 7,
  },
  {
    id: 6,
    title: '2025 Dreamhack CTF Write-ups',
    summary: 'Dreamhack CTF에 참여하여 해결한 주요 문제들의 풀이를 공유합니다.',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=80',
    categories: ['CTF'],
    team: [
      { name: '김민준', profileImageUrl: 'https://i.pravatar.cc/150?u=1' },
      { name: '이수진', profileImageUrl: 'https://i.pravatar.cc/150?u=2' },
      { name: '박보안', profileImageUrl: 'https://i.pravatar.cc/150?u=3' },
    ],
    documentCount: 15,
  },
];
const allCategories = ['웹 해킹', '리버싱', '포렌식', 'CTF', '웹 개발'];

// --- UI 컴포넌트 ---
const ProjectCard = ({ project }: { project: (typeof allProjects)[0] }) => (
  <Link
    href={`/projects/${project.id}`}
    className='block border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow bg-white flex flex-col'
  >
    <div className='overflow-hidden'>
      <img
        src={project.thumbnailUrl}
        alt={project.title}
        className='w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300'
      />
    </div>
    <div className='p-4 flex flex-col flex-grow'>
      <div className='flex flex-wrap gap-1 mb-2'>
        {project.categories.map((cat) => (
          <span
            key={cat}
            className='text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded'
          >
            {cat}
          </span>
        ))}
      </div>
      <h3 className='font-semibold text-gray-800 flex-grow'>{project.title}</h3>
      <p className='text-sm text-gray-500 mt-1 h-10'>{project.summary}</p>
      <div className='border-t mt-3 pt-3 flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='flex -space-x-2 mr-2'>
            {project.team.slice(0, 3).map((member) => (
              <img
                key={member.name}
                src={member.profileImageUrl}
                alt={member.name}
                className='w-6 h-6 rounded-full border-2 border-white'
              />
            ))}
          </div>
          <span className='text-xs text-gray-500'>
            {project.team[0].name}{' '}
            {project.team.length > 1 ? `등 ${project.team.length}명` : ''}
          </span>
        </div>
        <div className='flex items-center text-xs text-gray-600 font-semibold'>
          <FileText size={12} className='mr-1' />
          <span>{project.documentCount}</span>
        </div>
      </div>
    </div>
  </Link>
);

const FilterSidebar = () => (
  <aside>
    <div className='sticky top-24 space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-3 flex items-center'>
          <ListFilter size={18} className='mr-2' /> 필터
        </h3>
      </div>
      <div>
        <label className='block text-sm font-bold text-gray-500 mb-2'>
          프로젝트 상태
        </label>
        <div className='space-y-2'>
          <label className='flex items-center'>
            <input type='checkbox' className='h-4 w-4 rounded' />{' '}
            <span className='ml-2'>완료</span>
          </label>
          <label className='flex items-center'>
            <input type='checkbox' className='h-4 w-4 rounded' />{' '}
            <span className='ml-2'>진행중</span>
          </label>
        </div>
      </div>
      <div>
        <label className='block text-sm font-bold text-gray-500 mb-2'>
          카테고리
        </label>
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
      </div>
      <div>
        <label className='block text-sm font-bold text-gray-500 mb-2'>
          사용 기술
        </label>
        <input
          type='text'
          placeholder='태그 검색...'
          className='w-full border rounded-lg px-3 py-2 text-sm'
        />
      </div>
    </div>
  </aside>
);

export default function ProjectsPage() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-12'>
        <section className='mb-12'>
          <h1 className='text-5xl font-extrabold mb-2'>Projects</h1>
          <p className='text-lg text-gray-600'>
            동아리 멤버들이 만들어낸 결과물들을 만나보세요.
          </p>
        </section>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
          <div className='lg:col-span-1'>
            <FilterSidebar />
          </div>

          <div className='lg:col-span-3'>
            <div className='flex w-full gap-4 justify-between items-center mb-6'>
              <input
                type='text'
                placeholder='프로젝트 이름으로 검색...'
                className='border rounded-lg px-4 py-2 w-full'
              />
              <Link
                href='/projects/new'
                className='flex items-center bg-indigo-600 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-indigo-700 flex-shrink-0'
              >
                <PlusCircle size={16} className='mr-2' /> 새 프로젝트 만들기
              </Link>
            </div>

            {/* ✨ 정렬 필터 추가 ✨ */}
            <div className='flex justify-end items-center mb-6'>
              <div className='flex items-center text-sm border rounded-md p-1 bg-white'>
                <button className='px-3 py-1 rounded font-semibold bg-gray-100 shadow-sm'>
                  최신순
                </button>
                <button className='px-3 py-1 rounded text-gray-500 hover:bg-gray-100'>
                  인기순
                </button>
                <button className='px-3 py-1 rounded text-gray-500 hover:bg-gray-100'>
                  이름순
                </button>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {allProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className='flex justify-center mt-12'>
              <div className='text-gray-500'>[ 페이지네이션 컴포넌트 ]</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
