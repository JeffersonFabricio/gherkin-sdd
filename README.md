# specherkin

> Playbook de IA para desenvolvimento guiado por especificação, onde **a especificação É Gherkin executável**.
> Princípios: **SDD · Gherkin · KISS · YAGNI**.

`specherkin` instala um playbook completo no seu projeto — princípios + comandos de
workflow — para **Claude Code, GitHub Copilot, Cursor e Gemini CLI**. Em vez de
user stories soltas, a sua spec é escrita em Gherkin e vira a fonte de verdade do
comportamento, dos critérios de aceite e dos testes.

```bash
npx specherkin init
```

## Por que

A maioria das ferramentas de Spec-Driven Development (como o
[spec-kit](https://github.com/github/spec-kit)) trata a spec como prosa. O problema:
prosa é ambígua e não é executável. O **specherkin** parte de uma premissa diferente:

> **A spec É Gherkin.** Se você não consegue escrever o `Given/When/Then`, você não
> entendeu o comportamento — e se não entendeu o comportamento, não deveria escrever código.

Quatro princípios guiam cada fase:

| Princípio | Papel |
|-----------|-------|
| **SDD**    | Define o portão: sem cenário, sem código. |
| **Gherkin**| Define o alvo: os cenários dizem exatamente quando você terminou. |
| **KISS**   | Define o caminho: a solução mais simples que faz os cenários passarem. |
| **YAGNI**  | Define a fronteira: pare quando os cenários passam, não vá além. |

Regra de ouro: **toda linha de código deve ser defensável apontando para um cenário.**

## Instalação

```bash
# Interativo (detecta os agentes do seu projeto e pergunta)
npx specherkin init

# Direto, para agentes específicos
npx specherkin init --agents claude,copilot

# Tudo, sobrescrevendo
npx specherkin init --agents all --force

# Ver agentes e comandos suportados
npx specherkin list
```

### O que é gerado

| Agente          | Princípios                          | Comandos                       |
|-----------------|-------------------------------------|--------------------------------|
| Claude Code     | `CLAUDE.md`                         | `.claude/commands/*.md`        |
| GitHub Copilot  | `.github/copilot-instructions.md`   | `.github/prompts/*.prompt.md`  |
| Cursor          | `.cursor/rules/specherkin.mdc`      | `.cursor/commands/*.md`        |
| Gemini CLI      | `GEMINI.md`                         | `.gemini/commands/*.toml`      |

E, compartilhado entre todos:

```
.specherkin/
  constitution.md          # princípios específicos do seu projeto
  templates/               # modelos de feature.feature, plan.md, tasks.md
```

## O workflow

```
/constitution → /specify → /clarify → /plan → /tasks → /implement → /analyze
```

| Comando         | O que faz |
|-----------------|-----------|
| `/constitution` | Define os princípios específicos do projeto (stack, língua, runner de testes). |
| `/specify`      | Escreve a spec em **Gherkin** (`specs/NNN-feature/feature.feature`). |
| `/clarify`      | Faz perguntas estruturadas para eliminar ambiguidade da spec. |
| `/plan`         | Decide a arquitetura mais simples que realiza os cenários. |
| `/tasks`        | Gera o checklist test-first, cada tarefa amarrada a um cenário. |
| `/implement`    | Implementa em ordem, test-first, só o que os cenários exigem. |
| `/analyze`      | Audita a coerência spec ↔ plano ↔ tarefas ↔ código. |

### Exemplo de spec (a fonte de verdade)

```gherkin
@critico
Funcionalidade: Login com e-mail
  Para que eu acesse minha conta com segurança
  Como usuário cadastrado
  Eu quero entrar com e-mail e senha

  Cenário: Login bem-sucedido
    Dado que existe uma conta para "ana@exemplo.com"
    Quando ela informa a senha correta
    Então ela é autenticada e vê o painel

  Cenário: Senha incorreta
    Dado que existe uma conta para "ana@exemplo.com"
    Quando ela informa uma senha errada
    Então o acesso é negado com a mensagem "Credenciais inválidas"
```

A partir daqui, `/plan` escolhe o como, `/tasks` cria os testes desses cenários
primeiro, e `/implement` só escreve código que faz esses cenários passarem.

## Comparação

| | spec-kit | forge-sdd | **specherkin** |
|--|----------|-----------|----------------|
| Base | — | spec-kit | próprio |
| Spec | prosa / user stories | prosa | **Gherkin executável** |
| Princípios explícitos | constitution | constitution | **SDD + Gherkin + KISS + YAGNI no núcleo** |
| Spec = testes | não diretamente | não diretamente | **sim, por construção** |
| Idioma | inglês | inglês | **português** |
| Agentes | 30+ | via spec-kit | Claude, Copilot, Cursor, Gemini |

## Desenvolvimento

```bash
node --test          # roda os testes
node bin/specherkin.js init --agents all --cwd /tmp/teste
```

Sem dependências de runtime — Node puro (>=18).

## Licença

MIT
