import { Search } from 'lucide-react';

export default function AdminUsersPage() {
  // 가상 데이터
  const users = [
    {
      id: 1,
      name: '김민준',
      email: 'a@a.com',
      role: '운영진',
      status: '정회원',
    },
    {
      id: 2,
      name: '이수진',
      email: 'b@b.com',
      role: '정회원',
      status: '정회원',
    },
    {
      id: 3,
      name: '박보안',
      email: 'c@c.com',
      role: '정회원',
      status: '정회원',
    },
    {
      id: 4,
      name: '김신입',
      email: 'd@d.com',
      role: '준회원',
      status: '승인 대기',
    },
  ];

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>회원 관리</h1>
      <div className='bg-white p-6 rounded-lg shadow'>
        <div className='flex justify-between items-center mb-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='이름, 이메일로 검색'
              className='border rounded-lg pl-10 pr-4 py-2'
            />
          </div>
        </div>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='px-6 py-3'>이름</th>
              <th className='px-6 py-3'>이메일</th>
              <th className='px-6 py-3'>등급</th>
              <th className='px-6 py-3'>상태</th>
              <th className='px-6 py-3'>관리</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='bg-white border-b'>
                <td className='px-6 py-4 font-medium text-gray-900'>
                  {user.name}
                </td>
                <td className='px-6 py-4'>{user.email}</td>
                <td className='px-6 py-4'>{user.role}</td>
                <td className='px-6 py-4'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === '정회원'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  {user.status === '승인 대기' && (
                    <button className='font-medium text-indigo-600 hover:underline mr-4'>
                      승인
                    </button>
                  )}
                  <button className='font-medium text-gray-600 hover:underline'>
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
