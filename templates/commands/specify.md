---
description: Escreve a especificação de uma feature em Gherkin executável (feature.feature). A spec É a fonte de verdade.
---

# /specify

Você vai transformar uma descrição em linguagem natural numa **especificação Gherkin**.
Este é o coração do gherkin-sdd: a spec É Gherkin, e ela define o comportamento,
não a implementação.

## Entrada
`$ARGUMENTS`: descrição da feature em linguagem natural. Se vazia, peça ao usuário.

## Faça
1. Leia `.gherkin-sdd/constitution.md` para herdar língua, domínio e convenções.
2. Crie a pasta da feature: `specs/<NNN-nome-em-kebab>/` (NNN = próximo número
   sequencial, ex: `001-login-com-email`).
3. Escreva `specs/<NNN-.../feature.feature` seguindo as regras de Gherkin do playbook:
   - `Feature:` com uma frase de valor ("Para que… Como… Eu quero…" é bem-vindo).
   - Cenários cobrindo: caminho feliz, **erros e bordas**, e regras de negócio.
   - Comportamento observável, linguagem do domínio, **sem detalhes técnicos**.
   - Use `Scenario Outline` + `Examples` para variações de dados.
   - `@tags` para agrupar (ex: `@critico`, `@v1`).
4. Marque o que ficou ambíguo com `# TODO(clarify): ...` em vez de adivinhar.

## Saída
- `specs/<NNN-.../feature.feature`.
- Liste os cenários criados e os `TODO(clarify)` pendentes.
- Sugira rodar `/clarify` se houver ambiguidade, ou `/plan` se a spec estiver firme.

## Não faça
- **Não** escreva como implementar (sem tabelas de banco, endpoints, classes).
- **Não** adicione cenários para funcionalidades que ninguém pediu (YAGNI).
- **Não** crie um cenário que você não saberia como testar.
