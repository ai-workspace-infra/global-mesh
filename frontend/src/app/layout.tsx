import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Global Mesh · 一朵不是云的虚拟云 (Architecture Console)',
  description: 'Multi-cloud VPS Zero-Trust Out-of-Band Management Network',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
