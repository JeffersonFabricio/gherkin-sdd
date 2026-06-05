---
description: Executa as tarefas em ordem, test-first. Só escreve código coberto por cenário.
---

# /implement

Você vai implementar a feature seguindo `tasks.md`, uma tarefa por vez, sempre
test-first, sem escrever nada que nenhum cenário justifique.

## Entrada
`$ARGUMENTS`: caminho da feature. Se vazio, use a mais recente em `specs/`.

## Faça
1. Leia `feature.feature`, `plan.md` e `tasks.md`.
2. Para cada tarefa, em ordem:
   - Escreva/atualize o **teste** primeiro e veja-o falhar.
   - Implemente o **mínimo** para passar (KISS).
   - Rode os testes. Marque a tarefa como `[x]` em `tasks.md`.
3. Se descobrir um comportamento não previsto por nenhum cenário:
   - **Pare.** Não improvise. Proponha um cenário e peça `/clarify`/`/specify`.
4. Ao terminar, rode a suíte completa: **todo cenário do `.feature` deve passar**.
5. Registre decisões técnicas relevantes e marque a feature como `pronta` no índice,
   em `.gherkin-sdd/memory/memory.md`.

## Saída
- Código implementado e testes passando.
- `tasks.md` com tarefas concluídas marcadas.
- `.gherkin-sdd/memory/memory.md` atualizado (decisões + índice).
- Relato de qualquer cenário que precisou ser adicionado/alterado (e por quê).

## Não faça
- **Não** escreva código sem um cenário/teste que o exija (YAGNI + SDD).
- **Não** adicione opções, flags ou generalizações "por garantia".
- **Não** marque pronto enquanto algum cenário falha.
