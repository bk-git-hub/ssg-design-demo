'use client';

import { Tab } from '@headlessui/react';
import {
  User,
  Activity,
  Settings,
  Save,
  Trash2,
  MessageSquare,
  Target,
  FileText,
  Heart,
  ArrowUpDown,
} from 'lucide-react';

// --- Helper Function ---
function cn(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- 가상 데이터 ---
const myProjects = [
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
];
const myArticles = [
  {
    id: 1,
    title: 'zustand를 이용한 간편한 상태 관리',
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80',
  },
];
const myLikedPosts = [
  {
    id: 1,
    title: 'JPA N+1 문제는 어떻게 해결하나요?',
    imageUrl:
      'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=500&q=80',
  },
];
const myQuestions = [
  {
    id: 1,
    title: 'React에서 상태 관리를 할 때 Redux 말고 다른 방법은 없나요?',
  },
];
const myComments = [
  {
    id: 1,
    postTitle: 'JPA N+1 문제는 어떻게 해결하나요?',
    content: '"fetch join을 사용하면 효과적입니다."',
  },
];

// --- UI 컴포넌트 ---

// 1. 프로필 수정 탭
const EditProfilePanel = () => (
  <div className='space-y-6'>
    <div>
      <h3 className='text-xl font-bold text-gray-800'>프로필 수정</h3>
      <p className='text-sm text-gray-500 mt-1'>
        이 정보는 다른 멤버들에게 보여집니다.
      </p>
    </div>
    <div className='border-t pt-6 space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>이름</label>
        <input
          type='text'
          defaultValue='김민준'
          className='mt-1 block w-full border rounded-md p-2'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          한 줄 소개
        </label>
        <input
          type='text'
          defaultValue='React와 TypeScript를 사랑하는 프런트엔드 개발자입니다.'
          className='mt-1 block w-full border rounded-md p-2'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          상세 소개
        </label>
        <textarea
          rows={5}
          className='mt-1 block w-full border rounded-md p-2'
          defaultValue='사용자에게 즐거움을 주는 인터랙티브 웹 개발에 관심이 많습니다...'
        ></textarea>
      </div>
    </div>
    <div className='flex justify-end border-t pt-4 mt-6'>
      <button className='flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700'>
        <Save size={16} className='mr-2' /> 프로필 저장
      </button>
    </div>
  </div>
);

// 2. 나의 활동 탭
const ThumbnailCard = ({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) => (
  <div className='block border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow'>
    <div className='overflow-hidden'>
      <img
        src={imageUrl}
        alt={title}
        className='w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300'
      />
    </div>
    <div className='p-4 bg-white'>
      <h3 className='font-semibold text-gray-800 truncate'>{title}</h3>
    </div>
  </div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <div className='border-b last:border-b-0 p-3 text-sm text-gray-700'>
    {children}
  </div>
);

const SortFilter = () => (
  <div className='flex justify-end mb-4'>
    <div className='flex items-center text-sm border rounded-md p-1 bg-gray-50'>
      <ArrowUpDown size={14} className='text-gray-500 mr-2' />
      <button className='px-2 py-1 rounded font-semibold bg-white border shadow-sm'>
        최신순
      </button>
      <button className='px-2 py-1 rounded text-gray-500 hover:bg-gray-200'>
        오래된순
      </button>
    </div>
  </div>
);

const MyActivityPanel = () => {
  const activityTabs = [
    '참여중인 프로젝트',
    '작성한 아티클',
    '좋아요 누른 글',
    '작성한 Q&A',
    '작성한 댓글',
  ];

  return (
    <div>
      <h3 className='text-xl font-bold text-gray-800 mb-4'>나의 활동</h3>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto'>
          {activityTabs.map((tabName) => (
            <Tab
              key={tabName}
              className={({ selected }) =>
                cn(
                  'w-full text-center whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md',
                  'focus:outline-none focus-visible:ring-2 ring-offset-2 ring-indigo-500',
                  selected
                    ? 'bg-white text-indigo-700 shadow'
                    : 'text-gray-600 hover:bg-white/[0.8]'
                )
              }
            >
              {tabName}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <SortFilter />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {myProjects.map((p) => (
                <ThumbnailCard
                  key={p.id}
                  title={p.title}
                  imageUrl={p.imageUrl}
                />
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <SortFilter />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {myArticles.map((a) => (
                <ThumbnailCard
                  key={a.id}
                  title={a.title}
                  imageUrl={a.imageUrl}
                />
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <SortFilter />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {myLikedPosts.map((p) => (
                <ThumbnailCard
                  key={p.id}
                  title={p.title}
                  imageUrl={p.imageUrl}
                />
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <SortFilter />
            <div className='border rounded-lg'>
              {myQuestions.map((q) => (
                <ListItem key={q.id}>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:underline'
                  >
                    {q.title}
                  </a>
                </ListItem>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <SortFilter />
            <div className='border rounded-lg'>
              {myComments.map((c) => (
                <ListItem key={c.id}>
                  <b>{c.postTitle}</b> 글에 "{c.content}"
                </ListItem>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

// 3. 계정 설정 탭
const AccountSettingsPanel = () => (
  <div className='space-y-12'>
    <div className='space-y-6'>
      <div>
        <h3 className='text-xl font-bold text-gray-800'>계정 정보</h3>
        <p className='text-sm text-gray-500 mt-1'>
          이 정보는 공개되지 않습니다.
        </p>
      </div>
      <div className='border-t pt-6 space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            이메일 주소
          </label>
          <input
            type='email'
            disabled
            value='dev.minjun@email.com'
            className='mt-1 block w-full border rounded-md p-2 bg-gray-100'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            비밀번호 변경
          </label>
          <button className='mt-1 text-sm text-indigo-600 hover:underline'>
            비밀번호 변경하기
          </button>
        </div>
      </div>
    </div>
    <div className='space-y-6 border-t pt-8 mt-8'>
      <div>
        <h3 className='text-xl font-bold text-red-600'>회원 탈퇴</h3>
        <p className='text-sm text-gray-500 mt-1'>
          회원 탈퇴 시 모든 활동 기록이 삭제되며, 복구할 수 없습니다.
        </p>
      </div>
      <div className='pt-6'>
        <button className='flex items-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700'>
          <Trash2 size={16} className='mr-2' /> 회원 탈퇴
        </button>
      </div>
    </div>
  </div>
);

// --- 메인 페이지 컴포넌트 ---
export default function SettingsPage() {
  const tabs = [
    { name: '프로필 수정', icon: <User />, content: <EditProfilePanel /> },
    { name: '나의 활동', icon: <Activity />, content: <MyActivityPanel /> },
    {
      name: '계정 설정',
      icon: <Settings />,
      content: <AccountSettingsPanel />,
    },
  ];

  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='container mx-auto px-4 py-12'>
        <h1 className='text-4xl font-extrabold mb-8'>마이페이지</h1>

        <Tab.Group as='div' className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='md:col-span-1'>
            <Tab.List className='flex flex-col space-y-2'>
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    cn(
                      'flex items-center w-full text-left p-3 rounded-lg text-md font-medium transition-colors duration-200',
                      'focus:outline-none focus-visible:ring-2 ring-offset-2 ring-indigo-500',
                      selected
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-gray-600 hover:bg-white hover:text-black'
                    )
                  }
                >
                  <div className='mr-3'>{tab.icon}</div>
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
          </div>

          <div className='md:col-span-3'>
            <Tab.Panels className='bg-white p-6 rounded-lg border min-h-[500px]'>
              {tabs.map((tab) => (
                <Tab.Panel key={tab.name}>{tab.content}</Tab.Panel>
              ))}
            </Tab.Panels>
          </div>
        </Tab.Group>
      </main>
    </div>
  );
}
