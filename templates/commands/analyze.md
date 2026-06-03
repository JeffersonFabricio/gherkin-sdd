---
description: Verifica consistência entre spec (Gherkin) ↔ plano ↔ tarefas ↔ código. Aponta lacunas e excessos.
---

# /analyze

Você vai auditar a coerência da feature. É um comando **somente leitura**: ele
reporta, não corrige (a correção volta pelo comando apropriado).

## Entrada
`$ARGUMENTS`: caminho da feature. Se vazio, use a mais recente em `specs/`.

## Faça
Leia `feature.feature`, `plan.md`, `tasks.md`, `.gherkin-sdd/memory/constitution.md` e o
código relacionado. Verifique e reporte:

1. **Cobertura (SDD)**: todo cenário tem tarefa e teste? Liste cenários órfãos.
2. **Excesso (YAGNI)**: existe código/contrato/tarefa que nenhum cenário exige?
   Liste cada um e o cenário que falta — ou recomende remoção.
3. **Simplicidade (KISS)**: há abstração ou camada sem justificativa em cenário?
4. **Fidelidade**: o `plan.md` contradiz a spec em algum ponto?
5. **Qualidade do Gherkin**: cenários com detalhe técnico, vagos, ou intestáveis?
6. **Constituição**: alguma violação das regras do projeto?

## Saída
- Relatório por seção, cada achado com severidade (🔴 bloqueia / 🟡 atenção / 🟢 ok)
  e a ação recomendada (`/clarify`, `/specify`, ajustar plano, remover código…).
- Veredito: a feature está consistente para ser considerada pronta?

## Não faça
- Não altere arquivos. Apenas reporte e recomende o próximo comando.
