// src/components/ResourceFilters.tsx
'use client';

type Props = {
  q: string;
  setQ: (v: string) => void;
  tag: string;
  setTag: (v: string) => void;
  topic: string;
  setTopic: (v: string) => void;
  level: string;
  setLevel: (v: string) => void;
  onReset: () => void;
  onAskAI: (question: string) => void;
  aiAnswer?: string | null;
  aiLoading?: boolean;
};

const TAGS = ['All','Guide','Template','Checklist'];
const TOPICS = ['All','Marketing','Automation','Websites','Funding','General'];
const LEVELS = ['All','Beginner','Intermediate'];

export default function ResourceFilters(props: Props) {
  const { q,setQ, tag,setTag, topic,setTopic, level,setLevel, onReset, onAskAI, aiAnswer, aiLoading } = props;

  return (
    <div className="glass rounded-2xl p-5 md:p-6">
      <div className="grid md:grid-cols-4 gap-3">
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Search resources…"
          className="rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
        />
        <SelectRow label="Type" value={tag} setValue={setTag} options={TAGS} />
        <SelectRow label="Topic" value={topic} setValue={setTopic} options={TOPICS} />
        <SelectRow label="Level" value={level} setValue={setLevel} options={LEVELS} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={onReset}
          className="rounded-xl px-4 py-2 text-sm border border-white/20 text-white hover:bg-white/10"
        >
          Reset
        </button>

        {/* Mini AI search */}
        <div className="flex-1" />
        <AIAsk onAskAI={onAskAI} aiAnswer={aiAnswer} aiLoading={aiLoading} />
      </div>
    </div>
  );
}

function SelectRow({label, value, setValue, options}:{label:string; value:string; setValue:(v:string)=>void; options:string[]}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/70 text-sm w-14">{label}</span>
      <select
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        className="flex-1 rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[var(--brand-primary)]"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function AIAsk({ onAskAI, aiAnswer, aiLoading }:{ onAskAI:(q:string)=>void; aiAnswer?:string|null; aiLoading?:boolean; }) {
  let inputVal = '';
  return (
    <div className="w-full md:w-[560px]">
      <div className="flex gap-2">
        <input
          onChange={(e)=>{ inputVal = e.target.value }}
          placeholder="Ask AI: e.g. ‘template for weekly report’"
          className="flex-1 rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--brand-primary)]"
        />
        <button
          onClick={()=> onAskAI(inputVal)}
          className="rounded-xl px-4 py-2 text-sm text-black"
          style={{ background: 'var(--brand-primary)' }}
          disabled={aiLoading}
        >
          {aiLoading ? 'Thinking…' : 'Ask AI'}
        </button>
      </div>
      {aiAnswer ? (
        <div className="mt-3 rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white/85">
          {aiAnswer}
        </div>
      ) : null}
    </div>
  );
}
