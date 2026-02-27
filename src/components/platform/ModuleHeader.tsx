type ModuleHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function ModuleHeader({ eyebrow, title, description }: ModuleHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,rgba(30,41,59,.85),rgba(8,16,28,.92))] p-7 md:p-10">
      <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-emerald-300/20 blur-2xl" />
      <p className="relative z-10 text-xs uppercase tracking-[0.2em] text-emerald-100/90">{eyebrow}</p>
      <h1 className="relative z-10 mt-3 text-2xl font-semibold leading-tight text-white md:text-4xl">{title}</h1>
      <p className="relative z-10 mt-3 max-w-3xl text-sm text-white/80 md:text-base">{description}</p>
    </header>
  );
}
