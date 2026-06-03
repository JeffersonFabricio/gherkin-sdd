---
description: Define a abordagem técnica (stack, arquitetura, contratos) que realiza os cenários Gherkin — a mais simples possível.
---

# /plan

Você vai decidir **como** realizar os cenários da spec, escolhendo a solução mais
simples que os satisfaz (KISS) e nada além (YAGNI).

## Entrada
`$ARGUMENTS`: caminho da feature. Se vazio, use a mais recente em `specs/`.

## Faça
1. Leia `feature.feature` e `.gherkin-sdd/memory/constitution.md`. A spec manda; o plano serve.
2. Escreva `specs/<.../plan.md` cobrindo **somente** o necessário para os cenários:
   - **Stack/decisões**: o que será usado e por quê (respeitando a constituição).
   - **Arquitetura mínima**: componentes e seus papéis. Sem camadas especulativas.
   - **Contratos**: APIs, schemas, eventos — apenas os que algum cenário exige.
   - **Mapa cenário → componente**: cada cenário aponta o que o realiza.
   - **Estratégia de teste**: qual runner executa os `.feature` e como.
3. Para cada decisão, anote a alternativa mais simples que você descartou e por quê.
   Se não houver razão forte, escolha a mais simples.

## Saída
- `specs/<.../plan.md`.
- Lista das decisões e dos trade-offs KISS/YAGNI.

## Não faça
- **Não** projete para requisitos futuros não especificados (YAGNI).
- **Não** introduza abstração sem um cenário que a torne necessária.
- **Não** contradiga a spec — se algo na spec for inviável, volte ao `/clarify`.
