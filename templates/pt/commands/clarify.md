---
description: Elimina ambiguidades da spec Gherkin com perguntas estruturadas antes de planejar.
---

# /clarify

Você vai reduzir a incerteza da spec **antes** de qualquer planejamento ou código.
Ambiguidade não resolvida vira retrabalho e código YAGNI.

## Entrada
`$ARGUMENTS`: caminho da feature (ex: `specs/001-login-com-email`). Se vazio, use
a feature mais recente em `specs/`.

## Faça
1. Leia o `feature.feature` da pasta. Colete todos os `# TODO(clarify)` e tudo que
   estiver subespecificado (regras vagas, valores não definidos, comportamento de
   borda omitido, termos ambíguos do domínio).
2. Faça perguntas **fechadas e numeradas**, agrupadas por tema. Prefira oferecer
   opções (a/b/c) a perguntas abertas. Pergunte só o que muda a spec — YAGNI.
3. A cada resposta, **atualize o `feature.feature`**: adicione/edite cenários,
   remova os `TODO(clarify)` resolvidos. Registre decisões relevantes em `notes.md`.
4. Pare quando não restar ambiguidade que afete o comportamento.

## Saída
- `feature.feature` atualizado e `notes.md` com o registro das decisões.
- Confirmação de que não há mais `TODO(clarify)` em aberto.

## Não faça
- Não decida arquitetura aqui (isso é `/plan`).
- Não pergunte sobre coisas fora do escopo dos cenários atuais.
