import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import { createServer } from 'node:net';
import process from 'node:process';
import { setTimeout as sleep } from 'node:timers/promises';

const args = process.argv.slice(2);

function argValue(name) {
  const match = args.find((arg) => arg.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : '';
}

function hasFlag(flag) {
  return args.includes(flag);
}

const requestedBase = argValue('--base');
const baseUrl = requestedBase || process.env.SMOKE_BASE_URL || '';
const requestedPort = Number(argValue('--port') || process.env.SMOKE_PORT || '4010');
const skipServer = hasFlag('--skip-server') || Boolean(baseUrl);
const skipBuild = hasFlag('--skip-build') || process.env.SMOKE_SKIP_BUILD === '1';

let port = requestedPort;
let effectiveBase = baseUrl || `http://127.0.0.1:${port}`;
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

let server = null;
let failed = 0;

function log(message) {
  process.stdout.write(`${message}\n`);
}

function fail(message) {
  failed += 1;
  process.stderr.write(`FAIL ${message}\n`);
}

async function isPortAvailable(value) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(value, '127.0.0.1');
  });
}

async function resolveAvailablePort(startPort) {
  for (let current = startPort; current < startPort + 20; current += 1) {
    // eslint-disable-next-line no-await-in-loop
    const available = await isPortAvailable(current);
    if (available) return current;
  }
  throw new Error(`No open port found in range ${startPort}-${startPort + 19}`);
}

async function runCommand(command, argsList, label) {
  log(`> ${label}`);
  await new Promise((resolve, reject) => {
    const child = spawn(command, argsList, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: process.env,
    });
    child.on('exit', (code) => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`${label} exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

async function waitForServer(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.status < 500) return;
    } catch {
      // keep waiting
    }
    await sleep(1000);
  }
  throw new Error(`Server did not become ready within ${timeoutMs}ms`);
}

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetch(url, options);
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(350 * attempt);
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error('fetch failed');
}

async function checkPage(path) {
  const url = `${effectiveBase}${path}`;
  try {
    const res = await fetchWithRetry(url, { redirect: 'manual' });
    if (res.status !== 200) {
      fail(`${path} expected 200, got ${res.status}`);
      return;
    }
    const html = await res.text();
    if (!html.includes('<html') || html.length < 800) {
      fail(`${path} returned unexpected HTML payload`);
      return;
    }
    log(`PASS ${path}`);
  } catch (error) {
    fail(`${path} request error: ${error instanceof Error ? error.message : 'unknown'}`);
  }
}

async function checkJson(path, options, validator) {
  const url = `${effectiveBase}${path}`;
  try {
    const res = await fetchWithRetry(url, options);
    if (res.status !== 200) {
      fail(`${path} expected 200, got ${res.status}`);
      return;
    }
    const json = await res.json();
    if (!validator(json)) {
      fail(`${path} returned invalid JSON shape`);
      return;
    }
    log(`PASS ${path}`);
  } catch (error) {
    fail(`${path} request error: ${error instanceof Error ? error.message : 'unknown'}`);
  }
}

async function runSuite() {
  const pageChecks = [
    '/',
    '/programs',
    '/book',
    '/community',
    '/resources',
    '/ai-search',
    '/platform',
    '/platform/dashboard',
    '/platform/onboarding',
    '/platform/booking-payments',
    '/platform/ai-copilot',
    '/platform/downloads',
    '/platform/workspace',
    '/platform/team',
    '/platform/certificates',
    '/platform/crm-automation',
    '/platform/success-tracker',
  ];

  for (const path of pageChecks) {
    await checkPage(path);
  }

  await checkJson('/api/events/next', {}, (json) => typeof json === 'object' && json !== null && 'next' in json);
  await checkJson('/api/resources', {}, (json) => Array.isArray(json) && json.length > 0);
  await checkJson(
    '/api/platform/onboarding',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'entrepreneur',
        primaryGoal: 'content',
        timeline: 'thisweek',
        budget: 'under1500',
        teamSize: '2',
      }),
    },
    (json) => Boolean(json?.ok) && Boolean(json?.recommendation)
  );
  await checkJson(
    '/api/platform/copilot',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        objective: 'Automate customer response workflow',
        industry: 'services',
        urgency: 'today',
        currentTools: 'WhatsApp, Sheets',
      }),
    },
    (json) => Boolean(json?.ok) && Array.isArray(json?.actions) && Array.isArray(json?.prompts)
  );
  await checkJson(
    '/api/platform/payment-link',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageName: 'AI Foundations',
        email: 'smoke@example.com',
        amount: '1299',
      }),
    },
    (json) => Boolean(json?.ok) && typeof json?.reference === 'string' && typeof json?.paymentUrl === 'string'
  );
  await checkJson(
    '/api/platform/success',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hoursSaved: 12,
        leadsCaptured: 45,
        conversions: 11,
        teamAdoption: 68,
      }),
    },
    (json) => Boolean(json?.ok) && typeof json?.momentumScore === 'number'
  );
  await checkJson(
    '/api/lead',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Smoke Lead',
        email: 'smoke@example.com',
        whatsapp: '+27710000000',
        company: 'Kasi Test',
        role: 'owner',
        goals: 'Automate weekly reporting',
        skillLevel: 'Beginner',
      }),
    },
    (json) => Boolean(json?.ok) && typeof json?.score === 'number' && typeof json?.priority === 'string'
  );
}

async function maybeBuild() {
  if (skipBuild || skipServer) return;
  try {
    await access('.next/BUILD_ID');
    log('> Build cache detected (.next/BUILD_ID). Skipping build.');
  } catch {
    await runCommand(npmCmd, ['run', 'build'], 'npm run build');
  }
}

async function maybeStartServer() {
  if (skipServer) return;

  const portArgProvided = Boolean(argValue('--port')) || Boolean(process.env.SMOKE_PORT);
  const requestedAvailable = await isPortAvailable(port);
  if (!requestedAvailable) {
    if (portArgProvided) {
      throw new Error(`Requested port ${port} is already in use.`);
    }
    const fallbackPort = await resolveAvailablePort(port + 1);
    log(`> Port ${port} is busy, using ${fallbackPort} instead.`);
    port = fallbackPort;
    effectiveBase = `http://127.0.0.1:${port}`;
  }

  log(`> Starting local Next server on port ${port}`);
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.on('data', (chunk) => process.stdout.write(`[server] ${chunk}`));
  server.stderr.on('data', (chunk) => process.stderr.write(`[server] ${chunk}`));

  await waitForServer(effectiveBase, 90000);
  log(`> Server ready: ${effectiveBase}`);
}

async function cleanup() {
  if (!server || server.killed) return;
  await new Promise((resolve) => {
    server.on('exit', () => resolve(undefined));
    server.kill('SIGTERM');
    setTimeout(() => {
      if (!server.killed) server.kill('SIGKILL');
    }, 5000);
  });
}

async function main() {
  log(`Smoke target: ${effectiveBase}`);
  if (skipServer) log('Server mode: external (no local server startup)');
  try {
    await maybeBuild();
    await maybeStartServer();
    await runSuite();
  } finally {
    await cleanup();
  }

  if (failed > 0) {
    process.stderr.write(`\nSmoke checks failed: ${failed}\n`);
    process.exit(1);
  }

  process.stdout.write('\nSmoke checks passed.\n');
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : 'Unknown smoke error'}\n`);
  process.exit(1);
});
