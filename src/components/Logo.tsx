// src/components/Logo.tsx
import Image from 'next/image';

type LogoProps = {
  size?: number;
  priority?: boolean;
  className?: string;
};

const LOGO_ASPECT_RATIO = 32 / 5.31;

export default function Logo({ size = 26, priority = false, className = '' }: LogoProps) {
  const width = Math.round(size * LOGO_ASPECT_RATIO);

  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="KasiAI Hub"
        width={width}
        height={size}
        priority={priority}
        unoptimized
        className="h-auto w-auto shrink-0 select-none drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
      />
    </span>
  );
}
