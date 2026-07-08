---
description: Quebra uma feature que cresceu demais em features menores e independentes. Mantém cada spec enxuta (KISS).
---

# /split

Você vai quebrar uma feature que ficou grande demais em **features menores e
desacopladas**, cada uma especificável, testável e entregável de forma
independente. Uma feature é candidata a split quando tem **mais de ~7 tarefas**,
mistura comportamentos não relacionados, ou seus cenários já não lêem como uma
única capacidade coerente.

## Entrada
`$ARGUMENTS`: caminho da feature. Se vazio, use a mais recente em `specs/`.

## Faça
1. Leia `feature.feature`, `plan.md` e `tasks.md`. Conte as tarefas e agrupe os
   cenários pela capacidade que exercitam.
2. Proponha uma decomposição em sub-features onde cada uma:
   - entrega valor observável por si só (o usuário poderia parar depois dela),
   - possui uma fatia coerente e testável dos cenários,
   - tem acoplamento mínimo com as outras (nomeie as dependências explicitamente).
3. **Confirme o split com o usuário** antes de tocar em arquivos.
4. Ao aprovar, para cada sub-feature crie `specs/<NNN-nome>/feature.feature`
   (próximos números sequenciais) e mova os cenários relevantes intactos — não
   reescreva comportamento, apenas redistribua. Anote o split e qualquer dependência
   de ordem no topo de cada novo `feature.feature`.
5. Atualize o **índice de features** em `.gherkin-sdd/memory/memory.md`: marque a
   original como `dividida` e adicione as novas features, e registre a decisão (data
   + porquê) no log de decisões.

## Saída
- A decomposição proposta (antes) e as pastas de spec criadas (depois).
- A ordem de dependência para implementá-las.
- Uma recomendação para rodar `/plan` na primeira sub-feature.

## Não faça
- Não mude o que os cenários significam — um split redistribui comportamento, não o redesenha.
- Não crie sub-features que só fazem sentido juntas (isso não é um split de verdade).
- Não divida só para bater um número; se a feature é genuinamente uma capacidade, diga e pare.
