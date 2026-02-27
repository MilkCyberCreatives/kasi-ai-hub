'use client';

import { useEffect, useMemo, useState } from 'react';
import ModuleHeader from '@/components/platform/ModuleHeader';

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
};

const INITIAL_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Program Lead', email: 'lead@kasiaihub.com', role: 'Admin' },
  { id: '2', name: 'Automation Coach', email: 'coach@kasiaihub.com', role: 'Editor' },
];

const STORAGE_KEY = 'kasi.platform.team.v1';

function createMemberId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `member-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function TeamPage() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as TeamMember[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMembers(parsed);
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }, [members]);

  function addMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const role = String(form.get('role') || 'Viewer') as TeamMember['role'];
    if (!name || !email) return;

    setMembers((prev) => [...prev, { id: createMemberId(), name, email, role }]);
    e.currentTarget.reset();
  }

  function removeMember(id: string) {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  }

  const roleBreakdown = useMemo(() => {
    return members.reduce(
      (acc, member) => {
        acc[member.role] += 1;
        return acc;
      },
      { Admin: 0, Editor: 0, Viewer: 0 }
    );
  }, [members]);

  return (
    <main className="container-x min-h-screen py-10 md:py-14">
      <ModuleHeader
        eyebrow="Platform / Team Accounts"
        title="Team seats and permissions"
        description="Manage collaborators, define responsibility levels, and keep platform access organized."
      />

      <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <article className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white">Add team member</h2>
          <form onSubmit={addMember} className="mt-4 grid gap-4 md:grid-cols-2">
            <input name="name" required placeholder="Full name" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            <input type="email" name="email" required placeholder="Email" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3" />
            <select name="role" defaultValue="Viewer" className="rounded-xl border border-white/15 bg-white/5 px-3 py-3">
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <button type="submit" className="rounded-xl px-5 py-3 text-sm font-semibold text-black" style={{ background: 'var(--brand-primary)' }}>
              Add member
            </button>
          </form>

          <div className="mt-6 grid gap-3">
            {members.map((member) => (
              <div key={member.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <div>
                  <p className="text-sm font-semibold text-white">{member.name}</p>
                  <p className="text-xs text-white/65">{member.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-white/80">{member.role}</span>
                  <button type="button" onClick={() => removeMember(member.id)} className="rounded-lg border border-white/20 px-2 py-1 text-xs text-white/80 hover:bg-white/10">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white">Permission summary</h2>
          <div className="mt-4 space-y-2">
            <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">Admins: {roleBreakdown.Admin}</p>
            <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">Editors: {roleBreakdown.Editor}</p>
            <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">Viewers: {roleBreakdown.Viewer}</p>
          </div>
          <p className="mt-4 text-sm text-white/70">Use Admin for owners, Editor for operators, and Viewer for read-only stakeholders.</p>
        </aside>
      </section>
    </main>
  );
}
