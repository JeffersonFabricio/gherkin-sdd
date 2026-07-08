// CLI do gherkin-sdd — Node puro, sem dependências externas.
import { parseArgs } from 'node:util';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { AGENTS, ALL_AGENT_IDS, COMMANDS } from './agents.js';
import { init, detectAgents } from './init.js';
import { LANGS, DEFAULT_LANG } from './render.js';

// Lê a versão do package.json para nunca dessincronizar.
const VERSION = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json'), 'utf8'),
).version;

// Cores ANSI mínimas (sem dependência).
const c = {
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
};

const BANNER = `${c.bold('gherkin-sdd')} ${c.dim('· SDD · Gherkin · KISS · YAGNI')}`;

function helpText() {
  return `
${BANNER}

Playbook de IA onde a especificação É Gherkin executável.

${c.bold('Uso')}
  npx gherkin-sdd <comando> [opções]

${c.bold('Comandos')}
  init        Instala o playbook (princípios + comandos) no projeto
  list        Lista agentes suportados e comandos do workflow
  help        Mostra esta ajuda

${c.bold('Opções de init')}
  --agents <lista>   Agentes separados por vírgula: ${ALL_AGENT_IDS.join(', ')}, all
  --lang <idioma>    Idioma do playbook: ${LANGS.join(', ')} (padrão: ${DEFAULT_LANG})
  --force            Sobrescreve arquivos existentes
  --yes, -y          Não pergunta nada (usa agentes detectados ou todos, idioma ${DEFAULT_LANG})
  --cwd <dir>        Diretório alvo (padrão: atual)

${c.bold('Exemplos')}
  npx gherkin-sdd init
  npx gherkin-sdd init --lang pt
  npx gherkin-sdd init --agents claude,copilot --lang en
  npx gherkin-sdd init --agents all --force
`;
}

function listText() {
  const agents = ALL_AGENT_IDS.map((id) => `  ${c.cyan(id.padEnd(8))} ${AGENTS[id].label} ${c.dim('→ ' + AGENTS[id].principles)}`).join('\n');
  const cmds = COMMANDS.map((cmd) => `  ${c.green('/' + cmd)}`).join('\n');
  return `\n${c.bold('Agentes suportados')}\n${agents}\n\n${c.bold('Workflow (ordem)')}\n${cmds}\n`;
}

function resolveAgents(arg, detected) {
  if (!arg) return null;
  if (arg === 'all') return ALL_AGENT_IDS;
  const ids = arg.split(',').map((s) => s.trim()).filter(Boolean);
  const unknown = ids.filter((id) => !ALL_AGENT_IDS.includes(id));
  if (unknown.length) {
    throw new Error(`Agente(s) inválido(s): ${unknown.join(', ')}. Válidos: ${ALL_AGENT_IDS.join(', ')}, all`);
  }
  return ids;
}

async function promptAgents(detected) {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const hint = detected.length
      ? `detectados: ${c.cyan(detected.join(', '))}`
      : 'nenhum detectado';
    stdout.write(`\nAgentes disponíveis: ${c.cyan(ALL_AGENT_IDS.join(', '))} (${hint})\n`);
    const def = detected.length ? detected.join(',') : 'all';
    const ans = await rl.question(`Para quais agentes instalar? [${def}] `);
    const chosen = ans.trim() || def;
    return resolveAgents(chosen, detected);
  } finally {
    rl.close();
  }
}

function resolveLang(arg) {
  if (!arg) return null;
  const lang = arg.trim().toLowerCase();
  if (!LANGS.includes(lang)) {
    throw new Error(`Idioma inválido: ${arg}. Válidos: ${LANGS.join(', ')}`);
  }
  return lang;
}

async function promptLang() {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    stdout.write(`\nIdioma do playbook: ${c.cyan(LANGS.join(', '))} (en = English, pt = português)\n`);
    const ans = await rl.question(`Em qual idioma gerar? [${DEFAULT_LANG}] `);
    return resolveLang(ans.trim()) ?? DEFAULT_LANG;
  } finally {
    rl.close();
  }
}

async function cmdInit(values) {
  const cwd = values.cwd ? values.cwd : process.cwd();
  const detected = await detectAgents(cwd);

  let agents = resolveAgents(values.agents, detected);
  if (!agents) {
    if (values.yes) {
      agents = detected.length ? detected : ALL_AGENT_IDS;
    } else {
      agents = await promptAgents(detected);
    }
  }

  let lang = resolveLang(values.lang);
  if (!lang) {
    lang = values.yes ? DEFAULT_LANG : await promptLang();
  }

  stdout.write(`\n${BANNER}\n`);
  stdout.write(`Instalando para: ${c.cyan(agents.join(', '))} ${c.dim('(' + lang + ')')}\n\n`);

  const results = await init({
    cwd,
    agents,
    lang,
    force: Boolean(values.force),
    log: (m) => stdout.write(`  ${c.green('✓')} ${m}\n`),
  });

  const written = results.filter((r) => r.status === 'written').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;

  stdout.write(`\n${c.green('Pronto.')} ${written} arquivo(s) criado(s)`);
  if (skipped) stdout.write(`, ${c.yellow(skipped + ' já existiam')} (use --force para sobrescrever)`);
  stdout.write('\n\n');
  stdout.write(`${c.bold('Próximos passos')}\n`);
  stdout.write(`  1. Abra seu agente de IA e rode ${c.green('/welcome-gherkin-sdd')} para o onboarding (constituição → memória).\n`);
  stdout.write(`  2. ${c.green('/specify')} para escrever a primeira spec em Gherkin (ou ${c.green('/discovery')} antes, se o problema ainda estiver nebuloso).\n`);
  stdout.write(`  3. ${c.green('/clarify → /plan → /tasks → /implement → /analyze')}.\n`);
  stdout.write(`  ${c.dim('Nas próximas sessões, comece por')} ${c.green('/status')} ${c.dim('para retomar de onde parou.')}\n\n`);
}

export async function run(argv) {
  const { values, positionals } = parseArgs({
    args: argv.slice(2),
    allowPositionals: true,
    options: {
      agents: { type: 'string' },
      lang: { type: 'string' },
      force: { type: 'boolean', default: false },
      yes: { type: 'boolean', short: 'y', default: false },
      cwd: { type: 'string' },
      version: { type: 'boolean', short: 'v', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });

  if (values.version) {
    stdout.write(`${VERSION}\n`);
    return;
  }

  const command = positionals[0] ?? (values.help ? 'help' : 'help');

  switch (command) {
    case 'init':
      await cmdInit(values);
      break;
    case 'list':
      stdout.write(listText());
      break;
    case 'help':
      stdout.write(helpText());
      break;
    default:
      stdout.write(`Comando desconhecido: ${command}\n`);
      stdout.write(helpText());
      process.exitCode = 1;
  }
}
