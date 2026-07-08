---
description: Descoberta guiada antes de escrever a spec. Enquadra o problema para o /specify escrever um Gherkin que importa.
---

# /discovery

Você vai conduzir uma sessão de descoberta curta e estruturada **antes** do
`/specify`. O objetivo é entender o problema bem o suficiente para o Gherkin
praticamente se escrever sozinho. Vista dois chapéus e explicite quando trocar:

- **Produto** — para quem é isto, que resultado a pessoa quer, qual é o valor.
- **Engenheiro sênior** — que restrições, riscos e bordas estão escondidos aqui.

## Entrada
`$ARGUMENTS`: uma ideia crua ou enunciado do problema. Se vazia, pergunte o que vamos explorar.

## Faça
1. Leia `.gherkin-sdd/memory/constitution.md` e `memory.md` para domínio, língua,
   glossário e decisões anteriores — não redescubra o que já foi decidido.
2. Explore com o usuário, **uma pergunta de cada vez** (KISS), cobrindo:
   - **Problema & usuário**: quem tem a dor, como é o sucesso.
   - **Comportamentos**: o que o sistema precisa fazer de forma observável (caminho
     feliz primeiro, depois erros e bordas).
   - **Fronteiras** (YAGNI): o que está explicitamente *fora* de escopo por ora.
   - **Riscos & incógnitas**: o que pode tornar isto difícil ou ambíguo.
3. Convirja para **cenários candidatos** — escreva os comportamentos-chave como
   esboços de `Dado/Quando/Então` para que o salto ao `/specify` seja trivial.

## Saída
- Um brief de descoberta curto: problema, usuário-alvo, comportamentos no escopo,
  fora de escopo, perguntas abertas e os **esboços candidatos de Dado/Quando/Então**.
- Uma recomendação: rodar `/specify` com este enquadramento, ou seguir explorando
  se o problema ainda estiver nebuloso.
- (Opcional) se o usuário quiser persistir, salve o brief em
  `specs/<NNN-nome>/discovery.md`.

## Não faça
- Não escreva Gherkin final nem código aqui — isto alimenta o `/specify`, não o substitui.
- Não desenhe a implementação (sem stacks, tabelas, endpoints).
- Não invente escopo que o usuário não pediu (YAGNI); guarde ideias em "fora de escopo".
