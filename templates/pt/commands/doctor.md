---
description: Diagnóstico da estrutura gherkin-sdd. Detecta arquivos ausentes, placeholders esquecidos e desvios spec ↔ memória.
---

# /doctor

Você vai rodar um diagnóstico do setup gherkin-sdd do projeto e reportar sua saúde.
Este é um comando **somente leitura**: ele encontra problemas e recomenda o comando
que corrige cada um — não corrige por conta própria.

## Faça
Verifique e reporte:

1. **Estrutura** — `.gherkin-sdd/memory/constitution.md` e `memory.md` existem?
   Os arquivos dos agentes em uso estão presentes (`CLAUDE.md`, `.claude/commands/`,
   `.github/prompts/`, `.cursor/`, `.gemini/`)?
2. **Placeholders** — `constitution.md` ainda contém `<placeholders>` não preenchidos?
3. **Desvio índice ↔ disco** — toda feature no índice do `memory.md` tem pasta em
   `specs/`, e toda pasta em `specs/` aparece no índice, com status coerente.
4. **Integridade da spec** — toda feature ativa tem `feature.feature`; specs com
   plano/tarefas mas sem cenários, ou cenários sem tarefa, são sinalizados.
5. **Higiene de contexto** — o `memory.md` está ficando longo ou cheio de entradas
   obsoletas que deveriam ser enxugadas? Há `TODO(clarify)` esquecidos pelas specs?

## Saída
- Um relatório em checklist, cada item marcado 🟢 ok / 🟡 atenção / 🔴 quebrado.
- Para cada 🟡/🔴, o remédio exato: o comando a rodar (`/welcome-gherkin-sdd`,
  `/constitution`, `/specify`, `/clarify`, `/analyze`…) ou a correção manual.
- Um veredito geral de uma linha: saudável, ou a primeira coisa a corrigir.

## Não faça
- Não modifique nenhum arquivo — apenas diagnostique e recomende.
- Não reporte ruído; se está tudo 🟢, diga isso de forma breve (KISS).
