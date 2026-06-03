// Definição dos agentes suportados e para onde cada artefato é renderizado.
//
// Cada agente declara:
//  - id/label: identificação
//  - principles: o arquivo de instruções de princípios (CLAUDE.md, etc.)
//  - commandsDir: onde os comandos/prompts são escritos
//  - commandFile(name): mapeia o nome lógico de um comando para o caminho final
//  - detect: pistas no projeto que sugerem que o agente já é usado

export const AGENTS = {
  claude: {
    id: 'claude',
    label: 'Claude Code',
    // Arquivo de princípios lido automaticamente pelo Claude Code.
    principles: 'CLAUDE.md',
    // Slash-commands nativos: /constitution, /specify, ...
    commandsDir: '.claude/commands',
    commandFile: (name) => `.claude/commands/${name}.md`,
    detect: ['CLAUDE.md', '.claude'],
  },
  copilot: {
    id: 'copilot',
    label: 'GitHub Copilot',
    principles: '.github/copilot-instructions.md',
    commandsDir: '.github/prompts',
    // Prompts reutilizáveis do Copilot usam a extensão .prompt.md.
    commandFile: (name) => `.github/prompts/${name}.prompt.md`,
    detect: ['.github/copilot-instructions.md'],
  },
  cursor: {
    id: 'cursor',
    label: 'Cursor',
    // Cursor lê regras em .cursor/rules/*.mdc.
    principles: '.cursor/rules/gherkin-sdd.mdc',
    commandsDir: '.cursor/commands',
    commandFile: (name) => `.cursor/commands/${name}.md`,
    detect: ['.cursor', '.cursorrules'],
  },
  gemini: {
    id: 'gemini',
    label: 'Gemini CLI',
    principles: 'GEMINI.md',
    commandsDir: '.gemini/commands',
    // Gemini CLI usa comandos custom em arquivos .toml; mantemos .md
    // para o conteúdo do prompt e geramos o wrapper .toml no render.
    commandFile: (name) => `.gemini/commands/${name}.toml`,
    detect: ['GEMINI.md', '.gemini'],
  },
};

export const ALL_AGENT_IDS = Object.keys(AGENTS);

// Os comandos do workflow SDD, em ordem de execução.
export const COMMANDS = [
  'constitution',
  'specify',
  'clarify',
  'plan',
  'tasks',
  'implement',
  'analyze',
];
