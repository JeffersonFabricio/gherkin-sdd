---
description: Retoma o projeto no início da sessão. Lê a memória + constituição e diz qual é a única próxima ação.
---

# /status

Rode isto **no início de cada sessão**. Você é o orquestrador: carregue o contexto
do projeto, entenda onde as coisas estão e aponte a única próxima ação. Este é um
comando **somente leitura** — ele orienta, não altera arquivos.

## Faça
1. Leia `.gherkin-sdd/memory/constitution.md` e, do `memory.md`, as seções
   **Estado atual** e **Índice de features** — não o log de decisões inteiro
   (orçamento de contexto: este comando roda toda sessão, mantenha-o barato).
   Se algum arquivo estiver ausente ou ainda cheio de `<placeholders>`, avise e
   encaminhe para `/welcome-gherkin-sdd`.
2. Confronte o **índice de features** com `specs/`:
   - Qual feature está em andamento? Qual o status (rascunho · especificada · em
     implementação · pronta)?
   - Na feature ativa, dê uma olhada em `feature.feature`, `plan.md` e `tasks.md`
     para ver quais itens do checklist ainda estão `[ ]`.
3. Detecte desvios: features no disco que faltam no índice, ou entradas do índice
   sem pasta. Sinalize (recomende `/doctor` para uma checagem completa).

## Saída
- **Onde estamos** (2-4 linhas): última feature concluída, o que está em andamento.
- **Próxima ação** — exatamente um comando, com o argumento a passar, ex.:
  `/implement specs/003-checkout` ou `/clarify` no `TODO(clarify)` em aberto.
- Qualquer `TODO(clarify)` pendente ou decisão não resolvida que valha destacar antes.

## Não faça
- Não altere nenhum arquivo (isso é papel do comando que você recomendar).
- Não devolva a memória inteira ao usuário — sintetize o estado (KISS).
- Não proponha mais de uma próxima ação; escolha a de maior alavancagem.
