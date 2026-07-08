---
description: Gera/atualiza uma visão de arquitetura C4 (Mermaid) que reflete o sistema que as specs de fato descrevem.
---

# /c4-architecture

Você vai produzir uma **visão de arquitetura C4 em Mermaid** que espelha o que as
specs e planos de fato descrevem — um mapa, não uma lista de desejos. Este é um
documento de nível de projeto que você atualiza quando a arquitetura muda, não a
cada feature.

## Entrada
`$ARGUMENTS`: foco opcional (um subsistema ou feature). Se vazio, cubra o sistema todo.

## Faça
1. Leia `.gherkin-sdd/memory/constitution.md` (stack, fronteiras), `memory.md`
   (decisões) e o `plan.md` das features implementadas para conhecer as peças reais.
2. Produza diagramas Mermaid, só nos níveis que carregam informação (KISS):
   - **Nível 1 — Contexto**: o sistema, seus usuários/personas e sistemas externos.
   - **Nível 2 — Contêiner**: as peças implantáveis/executáveis (apps, serviços,
     bancos) e como conversam.
   - **Nível 3 — Componente**: *apenas* para um contêiner complexo o bastante para justificar.
3. Diagrame **o que existe**. Marque o que ainda não foi construído como `planejado`
   (ex.: uma nota tracejada ou um comentário `%% planejado`) para o mapa nunca mentir
   sobre a realidade.
4. Escreva o resultado em `.gherkin-sdd/memory/architecture.md` (crie se não existir),
   com uma legenda curta e uma nota de "última sincronização" atrelada ao índice atual.

## Saída
- `.gherkin-sdd/memory/architecture.md` com os diagramas C4 em Mermaid + legenda.
- Uma nota de qualquer desvio encontrado entre o diagrama e as specs/planos.

## Não faça
- Não invente componentes que nenhuma spec ou plano justifique (YAGNI) — diagrame a realidade.
- Não vá mais fundo que o necessário; pule o nível de Componente a menos que se pague.
- Não deixe o diagrama contradizer as specs; se precisar, a spec vence — sinalize.
