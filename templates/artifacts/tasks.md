# Tarefas — <feature>

> Test-first. Cada tarefa cita o(s) cenário(s) que cobre. `[P]` = paralelizável.
> Toda tarefa rastreia a um cenário — sem tarefa órfã (YAGNI).

## Checklist
- [ ] T01 — Escrever teste do caminho feliz, deve falhar (cobre: Cenário "<…>") — `caminho/do/teste`
- [ ] T02 — Implementar o mínimo para T01 passar (cobre: Cenário "<…>") — `caminho/do/código`
- [ ] T03 — [P] Teste do caso de borda (cobre: Cenário "<…>") — `caminho/do/teste`
- [ ] T04 — Implementar caso de borda (cobre: Cenário "<…>") — `caminho/do/código`

## Cobertura cenário → tarefas (deve ser 100%)
| Cenário | Tarefas |
|---------|---------|
| <Cenário: caminho feliz> | T01, T02 |
| <Cenário: borda/erro>    | T03, T04 |
