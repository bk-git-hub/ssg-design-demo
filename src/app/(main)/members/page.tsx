import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  Target,
  FileText,
  UserCircle,
} from 'lucide-react';

// --- 가상 데이터 (요청사항 반영하여 수정) ---
const mockMembers = [
  {
    id: 1,
    name: '김민준',
    profileImageUrl: 'https://i.pravatar.cc/150?u=1',
    role: '운영진', // '활동 기수' -> '회원 등급'
    status: '활동',
    bio: 'React와 TypeScript를 사랑하는 프런트엔드 개발자입니다.',
    mainSkills: ['React', 'TypeScript', 'Next.js'],
    projectCount: 3, // 참여 프로젝트 수 추가
    articleCount: 8, // 작성 아티클 수 추가
  },
  {
    id: 2,
    name: '이수진',
    profileImageUrl: 'https://i.pravatar.cc/150?u=2',
    role: '정회원',
    status: '활동',
    bio: '사용자 경험을 중심으로 생각하는 UI/UX 디자이너 지망생.',
    mainSkills: ['Figma', 'UI/UX Research'],
    projectCount: 2,
    articleCount: 5,
  },
  {
    id: 4,
    name: '최고수',
    profileImageUrl: 'https://i.pravatar.cc/150?u=4',
    role: '선배',
    status: '졸업',
    bio: 'N사 백엔드 개발자. Spring 전문가.',
    mainSkills: ['Spring Boot', 'JPA', 'Kotlin'],
    projectCount: 12,
    articleCount: 28,
  },
  {
    id: 6,
    name: '강신입',
    profileImageUrl: 'https://i.pravatar.cc/150?u=6',
    role: '준회원',
    status: '활동',
    bio: '이제 막 웹 개발의 세계에 빠져들고 있습니다!',
    mainSkills: ['HTML', 'CSS', 'JavaScript'],
    projectCount: 0,
    articleCount: 1,
  },
  // ... other members
];

// 회원 등급별 스타일을 매핑하는 객체
const roleStyles: { [key: string]: string } = {
  운영진: 'bg-red-100 text-red-800',
  선배: 'bg-yellow-100 text-yellow-800',
  정회원: 'bg-green-100 text-green-800',
  준회원: 'bg-gray-200 text-gray-800',
};

// --- UI 컴포넌트 ---

// 멤버 카드 컴포넌트 (수정됨)
const MemberCard = ({ member }: { member: (typeof mockMembers)[0] }) => (
  <Link
    href={`/members/${member.id}`}
    className='block border rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col'
  >
    <div className='p-6 flex-grow'>
      <div className='flex items-center space-x-4 mb-4'>
        <img
          src={member.profileImageUrl}
          alt={member.name}
          className='w-16 h-16 rounded-full'
        />
        <div>
          <h3 className='text-xl font-bold'>{member.name}</h3>
          <p className='text-sm mt-1'>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                roleStyles[member.role]
              }`}
            >
              {member.role}
            </span>
          </p>
        </div>
      </div>
      <p className='text-gray-600 text-sm h-12 mb-4'>{member.bio}</p>
    </div>
    <div className='border-t bg-gray-50 px-6 py-4 space-y-3'>
      {/* 기여도 표시 영역 추가 */}
      <div>
        <h4 className='text-xs font-bold text-gray-500 mb-2'>기여도</h4>
        <div className='flex justify-around text-sm text-gray-700'>
          <div className='flex items-center'>
            <Target size={14} className='mr-1.5' /> 프로젝트{' '}
            {member.projectCount}개
          </div>
          <div className='flex items-center'>
            <FileText size={14} className='mr-1.5' /> 아티클{' '}
            {member.articleCount}개
          </div>
        </div>
      </div>
      {/* 주요 기술 영역 */}
      <div>
        <h4 className='text-xs font-bold text-gray-500 mb-2'>주요 기술</h4>
        <div className='flex flex-wrap gap-2'>
          {member.mainSkills.map((skill) => (
            <span
              key={skill}
              className='bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full'
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

// 필터 사이드바 컴포넌트 (수정됨)
const FilterSidebar = () => (
  <aside>
    <div className='sticky top-24 space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-3'>검색</h3>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            type='text'
            placeholder='이름으로 검색'
            className='w-full border rounded-lg pl-10 pr-4 py-2'
          />
        </div>
      </div>
      {/* '활동 기수' -> '회원 등급' 필터로 변경 */}
      <div>
        <h3 className='text-lg font-semibold mb-3'>회원 등급</h3>
        <div className='space-y-2'>
          <label className='flex items-center'>
            <input type='checkbox' className='h-4 w-4 rounded' />{' '}
            <span className='ml-2'>운영진</span>
          </label>
          <label className='flex items-center'>
            <input type='checkbox' className='h-4 w-4 rounded' />{' '}
            <span className='ml-2'>선배</span>
          </label>
          <label className='flex items-center'>
            <input type='checkbox' className='h-4 w-4 rounded' />{' '}
            <span className='ml-2'>정회원</span>
          </label>
          <label className='flex items-center'>
            <input type='checkbox' className='h-4 w-4 rounded' />{' '}
            <span className='ml-2'>준회원</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className='text-lg font-semibold mb-3'>기술 스택</h3>
        {/* 기술 스택 필터 UI */}
      </div>
    </div>
  </aside>
);

export default function MembersPage() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-12'>
        <section className='text-center mb-12'>
          <h1 className='text-5xl font-extrabold mb-4'>Members</h1>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            SSG를 만들어가는 뛰어난 동료들을 만나보세요.
          </p>
        </section>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
          <div className='lg:col-span-1'>
            <FilterSidebar />
          </div>
          <div className='lg:col-span-3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
              {mockMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
