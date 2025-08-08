import Header from '@/components/layout/Header';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
