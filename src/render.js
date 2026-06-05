// Carrega os templates do pacote e os adapta ao formato de cada agente.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES = join(__dirname, '..', 'templates');

// Idiomas suportados pelos templates. O padrão é inglês.
export const LANGS = ['en', 'pt'];
export const DEFAULT_LANG = 'en';

export function templatesDir(lang = DEFAULT_LANG) {
  return join(TEMPLATES, lang);
}

async function read(lang, rel) {
  return readFile(join(TEMPLATES, lang, rel), 'utf8');
}

// O núcleo de princípios é o mesmo conteúdo; só o cabeçalho/forma muda por agente.
export async function renderPrinciples(agentId, lang = DEFAULT_LANG) {
  const body = await read(lang, 'principles.md');
  if (agentId === 'cursor') {
    // Cursor usa frontmatter .mdc para regras sempre-ativas.
    return [
      '---',
      'description: Playbook gherkin-sdd — SDD, Gherkin, KISS, YAGNI',
      'alwaysApply: true',
      '---',
      '',
      body,
    ].join('\n');
  }
  return body;
}

// Comandos: o conteúdo neutro vira slash-command (Claude/Cursor), prompt do
// Copilot, ou wrapper .toml do Gemini.
export async function renderCommand(agentId, name, lang = DEFAULT_LANG) {
  const raw = await read(lang, join('commands', `${name}.md`));
  const { frontmatter, body } = splitFrontmatter(raw);
  const description = frontmatter.description ?? `Comando ${name} do gherkin-sdd`;

  if (agentId === 'gemini') {
    // Gemini CLI: comando custom em TOML, com {{args}} para os argumentos.
    const prompt = body.replace(/\$ARGUMENTS/g, '{{args}}');
    return [
      `description = ${JSON.stringify(description)}`,
      `prompt = """`,
      prompt.trimEnd(),
      `"""`,
      '',
    ].join('\n');
  }

  if (agentId === 'copilot') {
    // Copilot prompt files: frontmatter com mode + description.
    return [
      '---',
      'mode: agent',
      `description: ${JSON.stringify(description)}`,
      '---',
      '',
      body,
    ].join('\n');
  }

  // Claude Code e Cursor: markdown com frontmatter de description.
  return [
    '---',
    `description: ${description}`,
    '---',
    '',
    body,
  ].join('\n');
}

export async function readArtifact(name, lang = DEFAULT_LANG) {
  return read(lang, join('artifacts', name));
}

// Parser mínimo de frontmatter YAML simples (só `chave: valor`).
function splitFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { frontmatter: {}, body: raw.trim() };
  const frontmatter = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) frontmatter[kv[1]] = kv[2].trim();
  }
  return { frontmatter, body: m[2].trim() };
}
