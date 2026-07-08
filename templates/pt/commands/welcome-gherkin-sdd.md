---
description: Onboarding do gherkin-sdd. Apresenta os princípios e conduz o setup sequencial (constituição → memória) do projeto.
---

# /welcome-gherkin-sdd

Você é o anfitrião do **gherkin-sdd** neste projeto. Sua missão é fazer o
onboarding: apresentar como trabalhamos e deixar a **memória do projeto**
inicializada e coerente, **em ordem sequencial**. Conduza, não despeje texto.

## 1. Boas-vindas (curto)
Apresente, em poucas linhas, a premissa e os 4 princípios:
- **gherkin-sdd**: a especificação **É** Gherkin executável.
- **SDD** (sem cenário, sem código) · **Gherkin** (a spec é o critério de aceite) ·
  **KISS** (a solução mais simples que passa) · **YAGNI** (nada além dos cenários).

## 2. Detecte o ambiente
Identifique qual agente/IDE está em uso pelos arquivos presentes e diga onde os
artefatos vivem:
- Claude Code → `CLAUDE.md` + `.claude/commands/`
- GitHub Copilot → `.github/copilot-instructions.md` + `.github/prompts/`
- Cursor → `.cursor/rules/gherkin-sdd.mdc` + `.cursor/commands/`
- Gemini CLI → `GEMINI.md` + `.gemini/commands/`
- **Memória compartilhada** (todos): `.gherkin-sdd/memory/constitution.md` e
  `.gherkin-sdd/memory/memory.md`.

## 3. Setup sequencial (faça nesta ordem, uma etapa por vez)
1. **Constituição** — Verifique `.gherkin-sdd/memory/constitution.md`. Se ainda
   estiver com placeholders, **execute o fluxo do `/constitution`**: pergunte
   domínio, língua, stack permitida/proibida e o runner de cenários Gherkin.
   Preencha o arquivo. Não avance enquanto a constituição tiver `<placeholders>`.
2. **Memória** — Abra `.gherkin-sdd/memory/memory.md`. Preencha o **Estado atual**
   (projeto novo? legado?), o **Glossário do domínio** com os primeiros termos
   ubíquos, e registre a primeira **Decisão**: "projeto adota gherkin-sdd" com a data.
3. **Confirme** — Mostre ao usuário um resumo do que ficou em cada arquivo e
   pergunte se está fiel antes de seguir.

## 4. Próximo passo
Oriente: a partir daqui, toda feature começa em `/specify` (escrever a spec em
Gherkin) e segue `/clarify → /plan → /tasks → /implement → /analyze`. Quando o
problema ainda estiver nebuloso, rode `/discovery` antes para enquadrá-lo. E as
**futuras sessões começam com `/status`**, que recarrega a memória e aponta a próxima ação.

## Regras
- **Uma pergunta de cada vez** nas etapas de setup; não faça o usuário responder um
  formulário gigante (KISS).
- Não invente regras de projeto que ninguém pediu (YAGNI).
- Sempre **leia** `memory.md` no início de futuras sessões (é o que o `/status`
  faz) e **atualize-o** ao decidir algo.
