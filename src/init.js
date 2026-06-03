// Orquestra o `gherkin-sdd init`: detecta agentes, gera arquivos de princípios,
// comandos e os templates de artefatos no diretório alvo.
import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { AGENTS, ALL_AGENT_IDS, COMMANDS } from './agents.js';
import { renderPrinciples, renderCommand, readArtifact } from './render.js';

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// Sugere agentes já presentes no projeto, olhando pistas conhecidas.
export async function detectAgents(cwd) {
  const found = [];
  for (const id of ALL_AGENT_IDS) {
    for (const clue of AGENTS[id].detect) {
      if (await exists(join(cwd, clue))) {
        found.push(id);
        break;
      }
    }
  }
  return found;
}

async function writeFileSafe(path, content, { force }) {
  if (!force && (await exists(path))) {
    return { path, status: 'skipped' };
  }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, 'utf8');
  return { path, status: 'written' };
}

// Gera tudo para um conjunto de agentes. Retorna o relatório de arquivos.
export async function init({ cwd, agents, force = false, log = () => {} }) {
  const results = [];

  // 1) Memória do projeto: constituição + memory (fonte única, compartilhada
  //    entre todos os agentes), espelhando o espírito do spec-kit (.specify/memory).
  for (const mem of ['constitution.md', 'memory.md']) {
    const content = await readArtifact(mem);
    results.push(
      await writeFileSafe(join(cwd, '.gherkin-sdd', 'memory', mem), content, { force }),
    );
  }

  // Templates de artefatos para o /specify, /plan etc. copiarem.
  for (const art of ['feature.feature', 'plan.md', 'tasks.md']) {
    const content = await readArtifact(art);
    results.push(
      await writeFileSafe(join(cwd, '.gherkin-sdd', 'templates', art), content, { force }),
    );
  }

  // 2) Por agente: princípios + comandos.
  for (const id of agents) {
    const agent = AGENTS[id];
    if (!agent) throw new Error(`Agente desconhecido: ${id}`);

    const principles = await renderPrinciples(id);
    results.push(await writeFileSafe(join(cwd, agent.principles), principles, { force }));

    for (const cmd of COMMANDS) {
      const content = await renderCommand(id, cmd);
      results.push(await writeFileSafe(join(cwd, agent.commandFile(cmd)), content, { force }));
    }
    log(`${agent.label}: princípios + ${COMMANDS.length} comandos`);
  }

  return results;
}

export { COMMANDS };
