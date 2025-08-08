'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, RefObject } from 'react';
import {
  Clock,
  UserCircle,
  Tag,
  ThumbsUp,
  ChevronsRight,
  BarChart,
  Target,
  FileText,
} from 'lucide-react';

// --- 외부 클릭 감지 Hook ---
const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// --- 가상 데이터 ---
const articleData = {
  id: 'csrf-token-deep-dive',
  title: 'CSRF 토큰은 어떻게 동작하는가? 상세 분석',
  author: {
    id: 'user-2',
    name: '이수진',
    profileImageUrl: 'https://i.pravatar.cc/150?u=2',
    role: '정회원',
    projectCount: 2,
    articleCount: 5,
  },
  publishedAt: '2025-08-01',
  category: { name: '웹 해킹', slug: 'web-hacking' },
  tags: ['CSRF', 'Web Security', 'Authentication'],
  heroImageUrl:
    'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
  content: `
        <p>안녕하세요, SSG의 이수진입니다. 이번 아티클에서는 웹 보안의 가장 기본적인 공격 중 하나인 CSRF(Cross-Site Request Forgery)와 이를 방어하기 위한 토큰 매커니즘에 대해 깊이 있게 다뤄보겠습니다.</p>
        
        <h2 id="section-1">1. CSRF 공격이란 무엇인가?</h2>
        <p>CSRF는 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 만드는 공격입니다. 사용자가 로그인된 상태의 브라우저를 통해 공격용 스크립트가 포함된 페이지를 열면, 브라우저는 자동으로 인증 정보를 담아 요청을 보내기 때문에 서버는 이를 정상적인 요청으로 착각하게 됩니다.</p>
        
        <h2 id="section-2">2. Synchronizer Token Pattern</h2>
        <p>가장 널리 사용되는 방어법은 'Synchronizer Token Pattern'입니다. 서버는 사용자의 세션에 임의의 난수를 생성하여 저장하고, 동시에 이 값을 웹페이지의 숨겨진 폼 필드에 함께 전송합니다. 사용자가 요청을 보낼 때 이 토큰 값을 함께 보내면, 서버는 세션에 저장된 토큰과 사용자가 보낸 토큰이 일치하는지 검증합니다.</p>
        <pre><code class="language-html">&lt;form action="/change_password" method="POST"&gt;
    &lt;input type="hidden" name="csrf_token" value="a1b2c3d4e5f6g7h8" /&gt;
    &lt;input type="password" name="new_password" /&gt;
    &lt;input type="submit" value="Change Password" /&gt;
&lt;/form&gt;</code></pre>
        
        <h2 id="section-3">3. 결론</h2>
        <p>CSRF는 간단하지만 강력한 공격입니다. 현대적인 웹 프레임워크들은 대부분 내장된 CSRF 방어 기능을 제공하지만, 그 원리를 정확히 이해하고 사용하는 것이 중요합니다. 항상 사용자의 요청이 정말로 사용자의 의도에 의해 발생했는지 검증하는 습관을 들여야 합니다.</p>
    `,
  likes: 128,
  comments: [
    {
      id: 1,
      author: '김민준',
      text: '정리가 정말 잘 되어있네요! 이해가 쏙쏙 됩니다.',
    },
    {
      id: 2,
      author: '박보안',
      text: 'Double Submit Cookie 방식과의 차이점도 다뤄주시면 더 좋을 것 같아요.',
    },
  ],
};

const relatedArticles = [
  {
    id: 'xss-deep-dive',
    title: 'XSS 공격의 모든 것',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
  },
  {
    id: 'jwt-auth',
    title: 'JWT 인증 방식의 이해',
    imageUrl:
      'https://images.unsplash.com/photo-1584379924564-446753a429b9?w=500&q=80',
  },
];
const popularArticles = [
  {
    id: 'sql-injection-basics',
    title: '초보자를 위한 SQL Injection 기초',
    author: '박보안',
  },
  { id: 'nmap-guide', title: 'Nmap 스캔 옵션 완벽 가이드', author: '최고수' },
];

// --- UI 컴포넌트 ---
const TableOfContents = () => (
  <div>
    <h3 className='text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider'>
      On this page
    </h3>
    <ul className='space-y-2 text-sm border-l-2 border-gray-200'>
      <li>
        <a
          href='#section-1'
          className='block pl-4 text-gray-600 hover:text-indigo-600 hover:border-l-2 hover:border-indigo-600 -ml-0.5'
        >
          1. CSRF 공격이란 무엇인가?
        </a>
      </li>
      <li>
        <a
          href='#section-2'
          className='block pl-4 text-gray-600 hover:text-indigo-600 hover:border-l-2 hover:border-indigo-600 -ml-0.5'
        >
          2. Synchronizer Token Pattern
        </a>
      </li>
      <li>
        <a
          href='#section-3'
          className='block pl-4 text-gray-600 hover:text-indigo-600 hover:border-l-2 hover:border-indigo-600 -ml-0.5'
        >
          3. 결론
        </a>
      </li>
    </ul>
  </div>
);

const PopularArticleLink = ({
  article,
}: {
  article: (typeof popularArticles)[0];
}) => (
  <Link href={`/articles/${article.id}`} className='block group'>
    <h4 className='font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors'>
      {article.title}
    </h4>
    <p className='text-sm text-gray-500'>by {article.author}</p>
  </Link>
);

const RelatedArticleCard = ({
  article,
}: {
  article: (typeof relatedArticles)[0];
}) => (
  <Link
    href={`/articles/${article.id}`}
    className='flex items-center space-x-3 group'
  >
    <img
      src={article.imageUrl}
      alt={article.title}
      className='w-16 h-16 object-cover rounded-md flex-shrink-0'
    />
    <h4 className='text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors'>
      {article.title}
    </h4>
  </Link>
);

export default function ArticlePage() {
  const article = articleData;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(popoverRef, () => setIsPopoverOpen(false));

  return (
    <div className='bg-white min-h-screen'>
      <main className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
          <div className='lg:col-span-3'>
            <article>
              <header className='mb-8'>
                <Link
                  href={`/categories/${article.category.slug}`}
                  className='text-sm font-semibold text-indigo-600 hover:underline'
                >
                  {article.category.name}
                </Link>
                <h1 className='text-4xl lg:text-5xl font-extrabold my-3 leading-tight'>
                  {article.title}
                </h1>
                <div className='flex items-center space-x-4 text-sm text-gray-500'>
                  <div className='relative' ref={popoverRef}>
                    <button
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                      className='flex items-center space-x-2 group'
                    >
                      <img
                        src={article.author.profileImageUrl}
                        alt={article.author.name}
                        className='w-8 h-8 rounded-full'
                      />
                      <span className='font-semibold text-gray-800 group-hover:text-indigo-600 group-hover:underline'>
                        {article.author.name}
                      </span>
                    </button>

                    {isPopoverOpen && (
                      <div className='absolute top-full mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-10'>
                        <div className='flex items-center space-x-3 mb-3'>
                          <img
                            src={article.author.profileImageUrl}
                            alt={article.author.name}
                            className='w-12 h-12 rounded-full'
                          />
                          <div>
                            <p className='font-bold text-gray-800'>
                              {article.author.name}
                            </p>
                            <span className='bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full'>
                              {article.author.role}
                            </span>
                          </div>
                        </div>
                        <div className='border-t pt-3 flex justify-around text-sm'>
                          <div className='text-center'>
                            <div className='font-bold'>
                              {article.author.projectCount}
                            </div>
                            <div className='text-xs text-gray-500'>
                              Projects
                            </div>
                          </div>
                          <div className='text-center'>
                            <div className='font-bold'>
                              {article.author.articleCount}
                            </div>
                            <div className='text-xs text-gray-500'>
                              Articles
                            </div>
                          </div>
                        </div>
                        <Link
                          href={`/members/${article.author.id}`}
                          className='flex items-center justify-center mt-3 w-full text-center text-xs font-bold text-indigo-600 bg-indigo-100 hover:bg-indigo-200 py-2 rounded-md'
                        >
                          프로필 보기{' '}
                          <ChevronsRight size={14} className='ml-1' />
                        </Link>
                      </div>
                    )}
                  </div>
                  <span>&middot;</span>
                  <div className='flex items-center'>
                    <Clock size={14} className='mr-1.5' /> {article.publishedAt}
                  </div>
                </div>
                <div className='flex flex-wrap gap-2 mt-4'>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className='bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </header>

              <img
                src={article.heroImageUrl}
                alt={article.title}
                className='w-full rounded-lg mb-8'
              />
              <div
                className='prose prose-lg max-w-none'
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            <div className='mt-12 pt-6 border-t flex justify-center'>
              <button className='flex flex-col items-center space-y-2 text-gray-600 hover:text-indigo-600 transition-colors group'>
                <div className='p-3 border-2 rounded-full group-hover:border-indigo-500'>
                  <ThumbsUp size={28} />
                </div>
                <span className='font-bold text-lg'>{article.likes}</span>
              </button>
            </div>

            <div className='mt-12 space-y-12'>
              {/* <div className='p-6 rounded-lg bg-gray-50 border flex items-center space-x-4'>
                <img
                  src={article.author.profileImageUrl}
                  alt={article.author.name}
                  className='w-16 h-16 rounded-full'
                />
                <div>
                  <p className='text-sm text-gray-500'>WRITTEN BY</p>
                  <h3 className='text-xl font-bold'>{article.author.name}</h3>
                </div>
              </div> */}

              {/* ✨ 수정된 댓글 섹션 ✨ */}
              <div>
                <h2 className='text-2xl font-bold mb-6'>
                  {article.comments.length} Comments
                </h2>
                <div className='space-y-6'>
                  {/* 댓글 목록 */}
                  {article.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className='flex items-start space-x-3'
                    >
                      <UserCircle
                        size={40}
                        className='text-gray-400 flex-shrink-0'
                      />
                      <div className='flex-grow bg-gray-50 p-4 rounded-lg'>
                        <p className='font-semibold text-sm'>
                          {comment.author}
                        </p>
                        <p className='text-gray-700 mt-1'>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  {/* 댓글 작성 폼 */}
                  <div className='pt-6 border-t'>
                    <h3 className='font-semibold mb-2'>댓글 남기기</h3>
                    <textarea
                      className='w-full p-2 border rounded-md'
                      rows={3}
                      placeholder='다른 멤버들과 의견을 나눠보세요...'
                    ></textarea>
                    <button className='mt-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700'>
                      댓글 등록
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- 사이드바 --- */}
          <aside className='lg:col-span-1 hidden lg:block'>
            <div className='sticky top-24 space-y-10'>
              <TableOfContents />
              <div>
                <h3 className='text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center'>
                  <BarChart size={14} className='mr-2' />
                  인기 아티클
                </h3>
                <div className='space-y-4'>
                  {popularArticles.map((popular) => (
                    <PopularArticleLink key={popular.id} article={popular} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className='text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider'>
                  연관 아티클
                </h3>
                <div className='space-y-4'>
                  {relatedArticles.map((related) => (
                    <RelatedArticleCard key={related.id} article={related} />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
