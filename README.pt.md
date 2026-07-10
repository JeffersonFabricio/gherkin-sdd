# gherkin-sdd

*[English](https://github.com/JeffersonFabricio/gherkin-sdd/blob/main/README.md) · **Português***

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
# Interativo (detecta os agentes do seu projeto e pergunta agentes + idioma)
npx gherkin-sdd init

# Direto, para agentes específicos
npx gherkin-sdd init --agents claude,copilot

# Em português (o padrão é inglês)
npx gherkin-sdd init --lang pt

# Tudo, sobrescrevendo
npx gherkin-sdd init --agents all --force

# Ver agentes e comandos suportados
npx gherkin-sdd list
```

### Idioma

O playbook pode ser gerado em **inglês** (`en`, padrão) ou **português** (`pt`).
Use `--lang`:

```bash
npx gherkin-sdd init --lang en   # padrão: textos e Gherkin (Given/When/Then) em inglês
npx gherkin-sdd init --lang pt   # textos e Gherkin (Dado/Quando/Então) em português
```

No modo interativo, o `init` pergunta o idioma (padrão `en`). O idioma escolhido
vale para os princípios, os comandos e os exemplos Gherkin gerados.

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

O loop principal, por feature:

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

### Comandos de sessão & projeto

Usados conforme a necessidade, ao redor do loop principal:

| Comando | O que faz |
| --- | --- |
| `/status` | Início de cada sessão: recarrega a memória e aponta a única próxima ação. |
| `/discovery` | Enquadramento guiado do problema antes do `/specify`, terminando em Dado/Quando/Então candidatos. |
| `/split` | Quebra uma feature que cresceu demais (>~7 tarefas) em features menores e desacopladas. |
| `/c4-architecture` | Gera uma visão C4 em Mermaid que reflete o sistema que as specs de fato descrevem. |
| `/doctor` | Diagnostica integridade da estrutura, placeholders esquecidos e desvios spec ↔ memória. |

### Três papéis

Seja qual for o comando, a IA atua em uma de três posturas — **Orquestrador**
(lê a memória e decide a próxima ação: `/status`, `/welcome-gherkin-sdd`),
**Construtor** (transforma cenários no código mais simples que passa: `/implement`)
e **Revisor** (protege a coerência contra regressões e excesso: `/analyze`, `/doctor`).

### Orçamento de contexto

KISS e YAGNI também valem para quanto contexto a IA carrega pra fazer o trabalho —
leia a fatia que responde a pergunta, não o projeto inteiro toda vez. Isso já vem
embutido nos princípios (veja `CLAUDE.md`/`GEMINI.md`/etc. após o `init`), além de
alguns hábitos concretos que valem independente do agente:

- **Busque primeiro, leia depois.** Faça grep/busca pelo símbolo ou termo antes de
  abrir arquivos inteiros para localizar onde algo vive.
- **`memory.md` é log, não conjunto de trabalho.** Ele é append-only por design,
  então só cresce — puxe as seções *Estado atual* e *Índice de features* em vez de
  reler o histórico de decisões inteiro toda sessão (é exatamente para isso que
  `/status` e `/doctor` são escopados).
- **Isole buscas grandes e descartáveis.** Uma varredura ampla (escanear muitos
  arquivos, ou um log grande, atrás de um fato) pertence a um sub-agente/sub-tarefa
  cuja única saída é a resposta — não inline na sessão principal, onde cada arquivo
  tocado fica carregado. No Claude Code, isso é a ferramenta de agente
  `Task`/general-purpose; outros agentes têm um equivalente (um sub-chat escopado
  ou um script que você roda e lê a saída). O Claude Code também faz cache
  automático de prefixos de prompt repetidos — a continuidade de sessão (`/status`)
  se beneficia mais desse cache do que de reencenar contexto na mão.
- **Combine o modelo com o passo.** Trabalho mecânico (formatação, um rename fixo,
  rodar um linter) não precisa do mesmo nível de raciocínio que desenhar um plano
  ou resolver um cenário ambíguo — use a opção de modelo mais barata/rápida do seu
  agente para esses passos, quando ele tiver uma.

> O objetivo nunca é ler de menos o que um passo genuinamente precisa — um
> `/implement` que chuta comportamento porque pulou a spec viola o SDD. O objetivo
> é parar de pagar por contexto que nada a jusante vai usar.

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

## Desenvolvimento

```bash
npm run setup-hooks  # ativa os git hooks do repo (uma vez por clone)
node --test          # roda os testes
node bin/gherkin-sdd.js init --agents all --lang pt --cwd /tmp/teste
```

Sem dependências de runtime — Node puro (>=18).

### Git hooks: sem commit direto na main/master

O repositório versiona um hook `pre-commit` em [`.githooks/`](.githooks/) que
**bloqueia commits diretos em `main`/`master`** — o trabalho deve ir sempre por
uma branch de feature e um PR.

Ative-o uma vez por clone (também roda sozinho no `npm install`, via `prepare`):

```bash
npm run setup-hooks
# equivale a: git config core.hooksPath .githooks
```

Com o hook ativo:

```bash
git switch main
git commit -m "..."          # ✋ bloqueado — crie uma branch de feature
git switch -c feat/minha-mudanca
git commit -m "..."          # ✓ permitido
```

Para um caso legítimo na main (ex.: merge ou release local), use o override
explícito:

```bash
ALLOW_MAIN_COMMIT=1 git commit -m "release: v1.0.0"
```

> Isto é uma proteção **local** e complementar à proteção de branch do servidor
> (GitHub/GitLab) — não substitui as branch protection rules do repositório remoto.

## Inspiração e créditos

O `gherkin-sdd` foi construído a partir de duas fontes principais:

- **Documentação oficial do Claude** (Anthropic) — as práticas de instruções de
  projeto (`CLAUDE.md`), slash-commands e desenvolvimento guiado por agentes que
  moldaram o formato dos comandos e do playbook.
- **As falas recentes do Uncle Bob** (Robert C. Martin) — sua defesa de que testes
  e especificação são a mesma coisa, e de que o comportamento esperado deve guiar o
  código, é o que sustenta a tese central deste projeto: **a spec É Gherkin executável**,
  apoiada em KISS e YAGNI como disciplina de simplicidade.

O `gherkin-sdd` foi baseado no
[spec-kit](https://github.com/github/spec-kit) do GitHub, herdando dele a
estrutura de Spec-Driven Development, mas parte de uma premissa própria: a
especificação não é prosa, é comportamento executável.

## Licença

[Apache 2.0](LICENSE) © Jefferson Fabrício
