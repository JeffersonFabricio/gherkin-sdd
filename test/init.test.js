import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { init, detectAgents } from '../src/init.js';
import { renderCommand, renderPrinciples, readArtifact } from '../src/render.js';
import { ALL_AGENT_IDS, COMMANDS } from '../src/agents.js';

async function tmp() {
  return mkdtemp(join(tmpdir(), 'gherkin-sdd-'));
}
async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

test('init gera princípios e comandos para todos os agentes', async () => {
  const dir = await tmp();
  try {
    const results = await init({ cwd: dir, agents: ALL_AGENT_IDS });
    const written = results.filter((r) => r.status === 'written');
    // 5 artefatos compartilhados (constituição, memória, feature, plan, tasks)
    // + (1 princípio + N comandos) por agente.
    assert.equal(written.length, 5 + ALL_AGENT_IDS.length * (1 + COMMANDS.length));

    assert.ok(await exists(join(dir, 'CLAUDE.md')));
    assert.ok(await exists(join(dir, '.github', 'copilot-instructions.md')));
    assert.ok(await exists(join(dir, '.cursor', 'rules', 'gherkin-sdd.mdc')));
    assert.ok(await exists(join(dir, 'GEMINI.md')));
    assert.ok(await exists(join(dir, '.gherkin-sdd', 'memory', 'constitution.md')));
    assert.ok(await exists(join(dir, '.gherkin-sdd', 'memory', 'memory.md')));
    assert.ok(await exists(join(dir, '.claude', 'commands', 'welcome-gherkin-sdd.md')));
    for (const cmd of COMMANDS) {
      assert.ok(await exists(join(dir, '.claude', 'commands', `${cmd}.md`)));
      assert.ok(await exists(join(dir, '.gemini', 'commands', `${cmd}.toml`)));
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('init não sobrescreve sem --force, mas sobrescreve com --force', async () => {
  const dir = await tmp();
  try {
    await init({ cwd: dir, agents: ['claude'] });
    const second = await init({ cwd: dir, agents: ['claude'] });
    assert.ok(second.every((r) => r.status === 'skipped'));

    const forced = await init({ cwd: dir, agents: ['claude'], force: true });
    assert.ok(forced.every((r) => r.status === 'written'));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('detectAgents reconhece pistas existentes', async () => {
  const dir = await tmp();
  try {
    await init({ cwd: dir, agents: ['claude'] });
    const detected = await detectAgents(dir);
    assert.ok(detected.includes('claude'));
    assert.ok(!detected.includes('gemini'));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('render do Gemini produz TOML com prompt e {{args}}', async () => {
  const toml = await renderCommand('gemini', 'specify');
  assert.match(toml, /^description = /m);
  assert.match(toml, /prompt = """/);
  assert.match(toml, /\{\{args\}\}/);
  assert.doesNotMatch(toml, /\$ARGUMENTS/);
});

test('render do Cursor marca a regra como alwaysApply', async () => {
  const mdc = await renderPrinciples('cursor');
  assert.match(mdc, /alwaysApply: true/);
});

test('princípios contêm os 4 pilares', async () => {
  const body = await renderPrinciples('claude');
  for (const pilar of ['SDD', 'Gherkin', 'KISS', 'YAGNI']) {
    assert.match(body, new RegExp(pilar));
  }
});

test('idioma padrão é inglês (Given/When/Then)', async () => {
  const feature = await readArtifact('feature.feature');
  assert.match(feature, /^Feature:/m);
  assert.match(feature, /^\s*Scenario:/m);
  assert.match(feature, /Given /);
});

test('--lang pt gera Gherkin em português (Dado/Quando/Então)', async () => {
  const feature = await readArtifact('feature.feature', 'pt');
  assert.match(feature, /^Funcionalidade:/m);
  assert.match(feature, /^\s*Cenário:/m);
  assert.match(feature, /Dado que/);
});

test('init respeita o idioma escolhido', async () => {
  const dir = await tmp();
  try {
    await init({ cwd: dir, agents: ['claude'], lang: 'pt' });
    const claudeMd = await readFile(join(dir, 'CLAUDE.md'), 'utf8');
    assert.match(claudeMd, /Desenvolvimento guiado por especificação/);

    const feature = await readFile(join(dir, '.gherkin-sdd', 'templates', 'feature.feature'), 'utf8');
    assert.match(feature, /Funcionalidade:/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('idioma inexistente faz init falhar (sem template)', async () => {
  const dir = await tmp();
  try {
    await assert.rejects(() => init({ cwd: dir, agents: ['claude'], lang: 'fr' }));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
