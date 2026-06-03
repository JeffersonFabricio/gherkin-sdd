# Constituição do Projeto

> Estende o playbook **gherkin-sdd** (SDD · Gherkin · KISS · YAGNI).
> Em conflito, esta constituição vence sobre defaults, mas nunca sobre os 4 princípios.

## Os 4 princípios neste projeto
- **SDD** — sem cenário Gherkin, sem código. A spec vem antes.
- **Gherkin** — a spec É executável; os cenários são os critérios de aceite.
- **KISS** — a solução mais simples que faz os cenários passarem.
- **YAGNI** — só o que os cenários atuais exigem.

## Identidade
- **Produto / domínio**: <uma frase>
- **Língua da spec e do Gherkin**: <ex: português>
- **Linguagem ubíqua**: <termos do domínio que devem aparecer no Gherkin>

## Stack
- **Permitida / mandatória**: <ex: TypeScript, Node, Postgres>
- **Proibida**: <ex: sem ORM pesado, sem microserviços nesta fase>
- **Runner de cenários Gherkin**: <ex: Cucumber.js / Behave / pytest-bdd / SpecFlow>

## Regras não-negociáveis
- <segurança / compliance / performance / acessibilidade — só o que se aplica>

## Convenções
- <padrão de nomes, estrutura de pastas, formatação — curto e verificável>

---
*Edite via `/constitution`. Mantenha curto: KISS aplica-se a este documento.*
