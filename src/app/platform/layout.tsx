import type { ReactNode } from 'react';
import PlatformNav from '@/components/platform/PlatformNav';

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="container-x py-4">
        <PlatformNav />
      </section>
      {children}
    </>
  );
}
