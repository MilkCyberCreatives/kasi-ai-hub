'use client';

import { useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';

const WHATSAPP = process.env.NEXT_PUBLIC_COMMUNITY_WHATSAPP_URL || '#';
const SLACK = process.env.NEXT_PUBLIC_COMMUNITY_SLACK_URL || '#';

const ROOMS = [
  { id: 'launch', title: 'Launch Room', detail: 'Plan and ship your first automation this week.' },
  { id: 'marketing', title: 'Growth Room', detail: 'Campaign prompts, content workflows, and feedback loops.' },
  { id: 'ops', title: 'Ops Room', detail: 'Automate recurring processes and reporting cycles.' },
];

export default function WorkspacePage() {
  const [rsvp, setRsvp] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setRsvp((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / Workspace"
        title="Community collaboration workspace"
        description="Coordinate implementation with peers, mentors, and teams in focused work rooms."
      />

      <section className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <article className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white">Active work rooms</h2>
          <div className="mt-4 grid gap-3">
            {ROOMS.map((room) => (
              <div key={room.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">{room.title}</h3>
                  <button
                    type="button"
                    onClick={() => toggle(room.id)}
                    className={`rounded-lg px-3 py-1 text-xs ${
                      rsvp[room.id] ? 'bg-emerald-300/20 text-emerald-100 border border-emerald-300/40' : 'border border-white/20 text-white/80'
                    }`}
                  >
                    {rsvp[room.id] ? 'RSVP saved' : 'RSVP'}
                  </button>
                </div>
                <p className="mt-2 text-sm text-white/75">{room.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white">Workspace channels</h2>
          <div className="mt-4 grid gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10">
              Open WhatsApp Channel
            </a>
            <a href={SLACK} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10">
              Open Slack Workspace
            </a>
          </div>
          <p className="mt-4 text-sm text-white/70">Use channels for daily check-ins, wins, blockers, and workflow reviews.</p>
        </aside>
      </section>
    </main>
  );
}
