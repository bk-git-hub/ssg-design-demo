import Link from 'next/link';
import UserNav from '@/components/UserNav'; // UserNav는 재사용

// ✨ 관리자 전용 사이드바 컴포넌트 ✨
const AdminSidebar = () => (
  <aside className='w-64 bg-gray-800 text-white flex flex-col flex-shrink-0'>
    <div className='p-4 font-bold text-xl border-b border-gray-700'>
      SSG Admin
    </div>
    <nav className='flex-grow p-2'>
      <Link href='/admin' className='block p-3 rounded-md bg-gray-700'>
        대시보드
      </Link>
      <Link
        href='/admin/users'
        className='block p-3 rounded-md hover:bg-gray-700'
      >
        회원 관리
      </Link>
      <Link
        href='/admin/contents'
        className='block p-3 rounded-md hover:bg-gray-700'
      >
        콘텐츠 관리
      </Link>
      <Link
        href='/admin/community'
        className='block p-3 rounded-md hover:bg-gray-700'
      >
        커뮤니티 관리
      </Link>
    </nav>
  </aside>
);

// ✨ 관리자 전용 헤더 컴포넌트 ✨
const AdminHeader = () => (
  <header className='bg-white border-b h-16 flex items-center justify-end px-6'>
    <UserNav />
  </header>
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen bg-gray-100'>
      <AdminSidebar />
      <div className='flex flex-col flex-1'>
        <AdminHeader />
        <main className='flex-1 p-8 overflow-y-auto'>{children}</main>
      </div>
    </div>
  );
}
