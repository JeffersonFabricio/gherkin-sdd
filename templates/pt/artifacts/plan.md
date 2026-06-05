# Plano técnico — <feature>

> Realiza os cenários de `feature.feature`. A spec manda; o plano serve.
> Regra: a abordagem mais simples que faz os cenários passarem (KISS), nada além (YAGNI).

## Decisões de stack
| Decisão | Escolha | Por quê | Alternativa mais simples descartada |
|---------|---------|---------|--------------------------------------|
| <ex: persistência> | <escolha> | <razão ligada a um cenário> | <o que foi descartado e por quê> |

## Arquitetura mínima
- **<Componente>** — papel; quais cenários ele atende.

## Contratos
> Inclua apenas contratos exigidos por algum cenário.
- **<API / schema / evento>** — forma e cenário que o exige.

## Mapa cenário → componente
| Cenário | Componente(s) que o realiza |
|---------|------------------------------|
| <Cenário: …> | <componente> |

## Estratégia de teste
- **Runner Gherkin**: <ex: Cucumber.js>
- Como os `.feature` são executados; onde ficam os step definitions.

## Riscos / aberto
- <só o que for real; sem especulação YAGNI>
