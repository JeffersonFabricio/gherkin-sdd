---
description: Gera o checklist de implementação test-first, com cada tarefa amarrada a cenários Gherkin.
---

# /tasks

Você vai quebrar o plano em tarefas pequenas, ordenadas e **test-first**, onde cada
tarefa é rastreável a um ou mais cenários.

## Entrada
`$ARGUMENTS`: caminho da feature. Se vazio, use a mais recente em `specs/`.

## Faça
1. Leia `feature.feature` e `plan.md`.
2. Escreva `specs/<.../tasks.md` como checklist Markdown. Para cada tarefa:
   - Comece pelo teste: a primeira tarefa de cada cenário é "escrever o teste que
     prova o cenário X (deve falhar)".
   - Em seguida, a implementação mínima que faz o teste passar.
   - Cite o(s) cenário(s) coberto(s): `(cobre: Scenario "…")`.
   - Indique arquivos/paths concretos.
   - Marque tarefas paralelizáveis com `[P]`.
3. Ordene por dependência. Cada cenário do `.feature` deve ter cobertura — se algum
   ficar sem tarefa, **é bug**: ou falta tarefa ou o cenário é supérfluo (YAGNI → remova via clarify).
4. Não crie tarefas que não rastreiam a nenhum cenário.

## Saída
- `specs/<.../tasks.md`.
- Tabela de cobertura: cada cenário → tarefas que o cobrem (deve ser 100%).

## Não faça
- Não inclua tarefas "infra para o futuro" sem cenário (YAGNI).
- Não agrupe vários comportamentos numa tarefa gigante (KISS).
