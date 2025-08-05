import Link from 'next/link';
import {
  Github,
  Linkedin,
  Mail,
  Target,
  FileText,
  Award,
  Star,
  CheckCircle,
} from 'lucide-react';

// --- 가상 데이터 (썸네일 imageUrl 추가) ---
const mockMemberDetail = {
  id: 1,
  name: '김민준',
  profileImageUrl: 'https://i.pravatar.cc/150?u=1',
  role: '운영진',
  status: '활동',
  bio: 'React와 TypeScript를 사랑하는 프런트엔드 개발자입니다.',
  introduction: `<h3 class="text-xl font-bold">안녕하세요, SSG 20기 김민준입니다.</h3><p class="mt-2">사용자에게 즐거움을 주는 인터랙티브 웹 개발에 관심이 많습니다. 현재는 Next.js와 TypeScript를 이용한 풀스택 개발 역량을 키우기 위해 노력하고 있습니다.</p><p class="mt-2">코드 리뷰와 기술 공유를 좋아하니, 궁금한 점이 있다면 언제든지 편하게 연락주세요!</p>`,
  email: 'dev.minjun@email.com',
  githubUrl: '#',
  linkedinUrl: '#',
  projectCount: 3,
  articleCount: 4,
  skills: [
    { name: 'React', proficiency: 'ADVANCED' },
    { name: 'TypeScript', proficiency: 'ADVANCED' },
    { name: 'Next.js', proficiency: 'INTERMEDIATE' },
    { name: 'Node.js', proficiency: 'INTERMEDIATE' },
  ],
  badges: [
    { name: '명예의 전당 아티클', icon: <Award /> },
    { name: '이달의 기여자', icon: <Star /> },
    { name: 'Q&A 해결사', icon: <CheckCircle /> },
  ],
  projects: [
    {
      id: 1,
      title: 'SSG 동아리 홈페이지 개발',
      imageUrl:
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&q=80',
    },
    {
      id: 2,
      title: '실시간 투표 앱 개발',
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
    },
    {
      id: 3,
      title: '교내 공지사항 알리미 봇',
      imageUrl:
        'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=500&q=80',
    },
  ],
  articles: [
    {
      id: 1,
      title: "Dreamhack 'Simple Board' 문제 풀이 (Write-up)",
      imageUrl:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80',
    },
    {
      id: 2,
      title: 'zustand를 이용한 간편한 상태 관리',
      imageUrl:
        'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80',
    },
    {
      id: 3,
      title: 'CSRF 토큰은 어떻게 동작하는가? 상세 분석',
      imageUrl:
        'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80',
    },
    {
      id: 4,
      title: '효과적인 코드 리뷰를 위한 5가지 팁',
      imageUrl:
        'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80',
    },
  ],
};

// --- UI 컴포넌트 ---
const SkillTag = ({
  skill,
}: {
  skill: (typeof mockMemberDetail.skills)[0];
}) => {
  const proficiencyStyles: Record<string, string> = {
    ADVANCED: 'border-2 border-indigo-600 font-bold text-indigo-600',
    INTERMEDIATE: 'border border-indigo-500 text-indigo-500',
    BEGINNER: 'border border-gray-400 text-gray-500',
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        proficiencyStyles[skill.proficiency]
      }`}
    >
      {skill.name}
    </span>
  );
};

// ✨ 썸네일이 포함된 새로운 활동 카드 컴포넌트 ✨
const ActivityCardWithThumbnail = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => (
  <Link
    href='#'
    className='block border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow'
  >
    <div className='overflow-hidden'>
      <img
        src={imageUrl}
        alt={title}
        className='w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300'
      />
    </div>
    <div className='p-4 bg-white'>
      <h3 className='font-semibold text-gray-800 truncate'>{title}</h3>
    </div>
  </Link>
);

export default function MemberDetailPage() {
  const member = mockMemberDetail;

  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* --- 1. 프로필 사이드바 (이전과 동일) --- */}
          <aside className='lg:col-span-1'>
            <div className='sticky top-24 bg-white p-6 rounded-lg border'>
              <img
                src={member.profileImageUrl}
                alt={member.name}
                className='w-32 h-32 rounded-full mx-auto mb-4 ring-4 ring-indigo-100'
              />
              <h1 className='text-3xl font-bold text-center'>{member.name}</h1>
              <p className='text-center text-gray-500 mt-1'>{member.bio}</p>

              <div className='flex justify-center space-x-2 my-4'>
                <span className='bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full'>
                  {member.role}
                </span>
                <span className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full'>
                  {member.status}
                </span>
              </div>

              <div className='flex justify-center space-x-4 my-6'>
                <Link
                  href={member.githubUrl}
                  className='text-gray-500 hover:text-black'
                >
                  <Github />
                </Link>
                <Link
                  href={member.linkedinUrl}
                  className='text-gray-500 hover:text-black'
                >
                  <Linkedin />
                </Link>
                <Link
                  href={`mailto:${member.email}`}
                  className='text-gray-500 hover:text-black'
                >
                  <Mail />
                </Link>
              </div>

              <div className='border-t pt-4'>
                <h3 className='text-sm font-bold text-gray-500 mb-3'>기여도</h3>
                <div className='flex justify-between text-center'>
                  <div>
                    <div className='font-bold text-xl'>
                      {member.projectCount}
                    </div>
                    <div className='text-xs text-gray-500'>Projects</div>
                  </div>
                  <div>
                    <div className='font-bold text-xl'>
                      {member.articleCount}
                    </div>
                    <div className='text-xs text-gray-500'>Articles</div>
                  </div>
                  <div>
                    <div className='font-bold text-xl'>
                      {member.badges.length}
                    </div>
                    <div className='text-xs text-gray-500'>Badges</div>
                  </div>
                </div>
              </div>

              <div className='border-t pt-4 mt-4'>
                <h3 className='text-sm font-bold text-gray-500 mb-3'>
                  획득 뱃지
                </h3>
                <div className='space-y-2'>
                  {member.badges.map((badge) => (
                    <div key={badge.name} className='flex items-center text-sm'>
                      <div className='text-yellow-500 mr-2'>{badge.icon}</div>
                      <span className='font-semibold'>{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='border-t pt-4 mt-4'>
                <h3 className='text-sm font-bold text-gray-500 mb-3'>
                  주요 기술
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {member.skills.map((skill) => (
                    <SkillTag key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* --- 2. 메인 콘텐츠 (썸네일 그리드로 변경) --- */}
          <div className='lg:col-span-2'>
            <div className='space-y-12'>
              <section className='bg-white p-6 rounded-lg border'>
                <div
                  className='prose max-w-none'
                  dangerouslySetInnerHTML={{ __html: member.introduction }}
                />
              </section>

              <section>
                <h2 className='text-2xl font-bold mb-4'>참여 프로젝트</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {member.projects.map((project) => (
                    <ActivityCardWithThumbnail
                      key={project.id}
                      title={project.title}
                      imageUrl={project.imageUrl}
                    />
                  ))}
                </div>
              </section>

              <section>
                <h2 className='text-2xl font-bold mb-4'>작성 아티클</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {member.articles.map((article) => (
                    <ActivityCardWithThumbnail
                      key={article.id}
                      title={article.title}
                      imageUrl={article.imageUrl}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
