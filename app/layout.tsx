import './global.css';

import { Banner } from 'fumadocs-ui/components/banner';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={GeistSans.className} suppressHydrationWarning>
      <body className='flex min-h-screen flex-col'>
        <Banner className='border-b border-border bg-card'>
          <a
            href='https://discord.gg/HCXhNYeVMb'
            target='_blank'
            rel='noreferrer noopener'
            className='underline-offset-2 hover:underline'
          >
            Join our Discord community today! 🎉
          </a>
        </Banner>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
