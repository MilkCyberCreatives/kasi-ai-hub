// src/components/Logo.tsx
import Image from 'next/image';

type LogoProps = {
  size?: number;
  priority?: boolean;
};

const LOGO_ASPECT_RATIO = 32 / 5.31;

export default function Logo({ size = 20, priority = false }: LogoProps) {
  const width = Math.round(size * LOGO_ASPECT_RATIO);

  return (
    <Image
      src="/logo.svg"
      alt="KasiAI Hub"
      width={width}
      height={size}
      priority={priority}
      className="h-auto w-auto shrink-0 select-none"
    />
  );
}

