# gherkin-sdd

> Playbook de IA para desenvolvimento guiado por especificação, onde **a especificação É Gherkin executável**.
> Princípios: **SDD · Gherkin · KISS · YAGNI**.

`gherkin-sdd` instala um playbook completo no seu projeto — princípios + comandos de
workflow — para **Claude Code, GitHub Copilot, Cursor e Gemini CLI**. Em vez de
user stories soltas, a sua spec é escrita em Gherkin e vira a fonte de verdade do
comportamento, dos critérios de aceite e dos testes.

```bash
npx gherkin-sdd init
```

## Por que

A maioria das ferramentas de Spec-Driven Development (como o
[spec-kit](https://github.com/github/spec-kit)) trata a spec como prosa. O problema:
prosa é ambígua e não é executável. O **gherkin-sdd** parte de uma premissa diferente:

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
npx gherkin-sdd init

# Direto, para agentes específicos
npx gherkin-sdd init --agents claude,copilot

# Tudo, sobrescrevendo
npx gherkin-sdd init --agents all --force

# Ver agentes e comandos suportados
npx gherkin-sdd list
```

### O que é gerado

| Agente          | Princípios                          | Comandos                       |
|-----------------|-------------------------------------|--------------------------------|
| Claude Code     | `CLAUDE.md`                         | `.claude/commands/*.md`        |
| GitHub Copilot  | `.github/copilot-instructions.md`   | `.github/prompts/*.prompt.md`  |
| Cursor          | `.cursor/rules/gherkin-sdd.mdc`      | `.cursor/commands/*.md`        |
| Gemini CLI      | `GEMINI.md`                         | `.gemini/commands/*.toml`      |

Cada agente recebe seus arquivos **na pasta nativa da própria ferramenta** —
Claude em `.claude/`, Copilot em `.github/`, Cursor em `.cursor/`, Gemini em
`.gemini/`. E a **memória do projeto** (fonte única, lida por todos) fica em:

```
.gherkin-sdd/
  memory/
    constitution.md        # princípios do seu projeto (estável)
    memory.md              # memória viva: decisões, aprendizados, glossário, índice
  templates/               # modelos de feature.feature, plan.md, tasks.md
```

> Inspirado no `.specify/memory/` do spec-kit: a constituição é estável, a
> `memory.md` evolui (decisões e contexto vivo, lida no início de cada sessão).

## Comece por aqui

Depois do `init`, **abra a IDE/agente que você escolheu e rode o comando de
boas-vindas** — ele detecta seu ambiente e conduz o setup **na ordem certa**
(constituição → memória) antes da primeira feature:

```
/welcome-gherkin-sdd
```

## O workflow

```
/welcome-gherkin-sdd → /constitution → /specify → /clarify → /plan → /tasks → /implement → /analyze
```

| Comando | O que faz |
| --- | --- |
| `/welcome-gherkin-sdd` | Onboarding: apresenta os princípios e inicializa a memória do projeto em ordem. |
| `/constitution` | Define os princípios específicos do projeto (stack, língua, runner de testes). |
| `/specify` | Escreve a spec em **Gherkin** (`specs/NNN-feature/feature.feature`). |
| `/clarify` | Faz perguntas estruturadas para eliminar ambiguidade da spec. |
| `/plan` | Decide a arquitetura mais simples que realiza os cenários. |
| `/tasks` | Gera o checklist test-first, cada tarefa amarrada a um cenário. |
| `/implement` | Implementa em ordem, test-first, só o que os cenários exigem. |
| `/analyze` | Audita a coerência spec ↔ plano ↔ tarefas ↔ código. |

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

| | spec-kit | forge-sdd | **gherkin-sdd** |
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
node bin/gherkin-sdd.js init --agents all --cwd /tmp/teste
```

Sem dependências de runtime — Node puro (>=18).

## Inspiração e créditos

O `gherkin-sdd` foi construído a partir de duas fontes principais:

- **Documentação oficial do Claude** (Anthropic) — as práticas de instruções de
  projeto (`CLAUDE.md`), slash-commands e desenvolvimento guiado por agentes que
  moldaram o formato dos comandos e do playbook.
- **As falas recentes do Uncle Bob** (Robert C. Martin) — sua defesa de que testes
  e especificação são a mesma coisa, e de que o comportamento esperado deve guiar o
  código, é o que sustenta a tese central deste projeto: **a spec É Gherkin executável**,
  apoiada em KISS e YAGNI como disciplina de simplicidade.

Os princípios de Spec-Driven Development dialogam com o
[spec-kit](https://github.com/github/spec-kit) do GitHub, mas o `gherkin-sdd`
parte de uma premissa própria: a especificação não é prosa, é comportamento executável.

## Licença

[Apache 2.0](LICENSE) © Jefferson Fabrício
