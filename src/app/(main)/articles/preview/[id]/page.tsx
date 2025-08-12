'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  UserCircle,
  Tag,
  ThumbsUp,
  ChevronsRight,
  BarChart,
} from 'lucide-react';
import { remark } from 'remark';
import html from 'remark-html';
import { useParams } from 'next/navigation';

// --- UI 컴포넌트 ---
const TableOfContents = ({ tocItems }: { tocItems: any[] }) => (
  <div>
    <h3 className='text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider'>
      On this page
    </h3>
    <ul className='space-y-2 text-sm border-l-2 border-gray-200'>
      {tocItems.map((item) => (
        <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 1}rem` }}>
          <a
            href={`#${item.id}`}
            className='block pl-4 text-gray-600 hover:text-indigo-600'
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default function ArticlePreviewPage() {
  const params = useParams();
  const [article, setArticle] = useState<any>(null);
  const [renderedContent, setRenderedContent] = useState('');
  const [tocItems, setTocItems] = useState<any[]>([]);

  useEffect(() => {
    const tempId = params.id ? params.id.toString() : '123';
    const dataString = localStorage.getItem(tempId);

    if (dataString) {
      const data = JSON.parse(dataString);
      setArticle(data);

      // Markdown을 HTML로 변환하고, 동시에 목차 생성
      remark()
        .use(html)
        .process(data.content)
        .then((file) => {
          const htmlContent = String(file);
          setRenderedContent(htmlContent);

          // --- HTML에서 제목(h1,h2,h3)을 파싱하여 TOC 생성 ---
          const newTocItems: any[] = [];
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlContent, 'text/html');
          doc.querySelectorAll('h1, h2, h3').forEach((header, index) => {
            const text = header.textContent || '';
            const id = `heading-${index}`;
            header.id = id; // TOC 링크를 위해 ID 부여
            newTocItems.push({
              id,
              text,
              level: parseInt(header.tagName.substring(1)),
            });
          });
          setTocItems(newTocItems);
        });

      localStorage.removeItem(tempId);
    }
  }, [params.id]);

  if (!article) {
    return (
      <div className='flex h-screen items-center justify-center'>
        미리보기 데이터를 불러오는 중...
      </div>
    );
  }

  return (
    <div>
      <div className='bg-yellow-300 text-center p-2 text-sm font-bold sticky top-0 z-50'>
        이 페이지는 미리보기 화면입니다.{' '}
        <a href='#' onClick={() => window.close()} className='underline'>
          편집 계속하기
        </a>
      </div>

      <main className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
          {/* --- 1. 메인 아티클 콘텐츠 --- */}
          <div className='lg:col-span-3'>
            <article>
              <header className='mb-8'>
                <p className='text-sm font-semibold text-indigo-600'>
                  {article.category.name}
                </p>
                <h1 className='text-4xl lg:text-5xl font-extrabold my-3 leading-tight'>
                  {article.title}
                </h1>
                <div className='flex items-center space-x-4 text-sm text-gray-500'>
                  <div className='flex items-center space-x-2'>
                    <img
                      src={article.author.profileImageUrl}
                      alt={article.author.name}
                      className='w-8 h-8 rounded-full'
                    />
                    <span className='font-semibold text-gray-800'>
                      {article.author.name}
                    </span>
                  </div>
                  <span>&middot;</span>
                  <div className='flex items-center'>
                    <Clock size={14} className='mr-1.5' /> {article.publishedAt}
                  </div>
                </div>
                <div className='flex flex-wrap gap-2 mt-4'>
                  {article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className='bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </header>

              {article.heroImageUrl && (
                <img
                  src={article.heroImageUrl}
                  alt={article.title}
                  className='w-full rounded-lg mb-8'
                />
              )}

              <div
                className='prose prose-lg max-w-none'
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />
            </article>
          </div>

          {/* --- 2. 사이드바 (목차만 표시) --- */}
          <aside className='lg:col-span-1 hidden lg:block'>
            <div className='sticky top-24 space-y-10'>
              <TableOfContents tocItems={tocItems} />

              {/* ✨ 인기/연관 아티클은 비활성화된 상태로 표시 ✨ */}
              <div>
                <h3 className='text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center'>
                  <BarChart size={14} className='mr-2' />
                  인기 아티클
                </h3>
                <p className='text-xs text-gray-400'>발행 후에 집계됩니다.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
